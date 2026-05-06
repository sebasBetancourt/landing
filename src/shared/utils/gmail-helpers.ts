/**
 * Gmail Helper Utilities
 * Utility functions for working with Gmail messages and data
 */

import type { GmailHeader, GmailMessage, GmailPayload } from '@/shared/types/gmail.types';

/**
 * Decode RFC 2047 encoded words (e.g., =?UTF-8?Q?Hello?=)
 */
function decodeRFC2047(encoded: string): string {
  // Check if the string contains encoded words
  const encodedWordRegex = /=\?([^?]+)\?([BQ])\?([^?]+)\?=/gi;
  
  return encoded.replace(encodedWordRegex, (match, charset, encoding, text) => {
    try {
      if (encoding === 'B' || encoding === 'b') {
        // Base64 encoding
        const decoded = atob(text.replace(/\s/g, ''));
        // Convert to UTF-8
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          bytes[i] = decoded.charCodeAt(i);
        }
        const decoder = new TextDecoder(charset.toLowerCase() || 'utf-8');
        return decoder.decode(bytes);
      } else if (encoding === 'Q' || encoding === 'q') {
        // Quoted-printable encoding
        let decoded = text.replace(/_/g, ' ').replace(/=([0-9A-F]{2})/gi, (_match: string, hex: string) => {
          return String.fromCharCode(parseInt(hex, 16));
        });
        // Convert bytes to UTF-8
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          bytes[i] = decoded.charCodeAt(i);
        }
        const decoder = new TextDecoder(charset.toLowerCase() || 'utf-8');
        return decoder.decode(bytes);
      }
    } catch (error) {
      console.warn('Failed to decode RFC 2047:', error);
    }
    return match;
  });
}

/**
 * Extract header value from message, checking multiple sources
 */
export function getMessageHeader(
  message: GmailMessage,
  headerName: string
): string {
  let headerValue = '';
  
  // Try headers map first (processed by backend)
  if (message.headers?.[headerName]) {
    headerValue = message.headers[headerName];
  } else if (message.payload?.headers) {
    // Try payload headers
    const header = message.payload.headers.find(
      (h: GmailHeader) => h.name?.toLowerCase() === headerName.toLowerCase()
    );
    if (header?.value) {
      headerValue = header.value;
    }
  }

  if (!headerValue) {
    return '';
  }

  // Decode RFC 2047 encoded words if present
  return decodeRFC2047(headerValue);
}

/**
 * Get sender email from message
 */
export function getSender(message: GmailMessage): string {
  const from = getMessageHeader(message, 'From');
  if (!from) return 'Unknown Sender';
  
  // Extract email from "Name <email@example.com>" format
  const emailMatch = from.match(/<(.+?)>/);
  return emailMatch ? emailMatch[1] : from;
}

/**
 * Get sender name from message
 */
export function getSenderName(message: GmailMessage): string {
  const from = getMessageHeader(message, 'From');
  if (!from) return 'Unknown';
  
  // Extract name from "Name <email@example.com>" format
  const nameMatch = from.match(/^(.+?)\s*</);
  if (nameMatch) {
    return nameMatch[1].trim().replace(/"/g, '');
  }
  
  return from;
}

/**
 * Get subject from message
 */
export function getSubject(message: GmailMessage): string {
  const subject = getMessageHeader(message, 'Subject');
  return subject || '(No subject)';
}

/**
 * Format message date in a Gmail-like way
 * Shows: time for today, day + time for this week, date for older
 */
export function formatMessageDate(message: GmailMessage): string {
  let dateStr = getMessageHeader(message, 'Date');
  
  // Fallback to internalDate if available
  if (!dateStr && message.internalDate) {
    try {
      // internalDate can be a string (timestamp) or number (milliseconds)
      const timestamp = typeof message.internalDate === 'string' 
        ? parseInt(message.internalDate, 10) 
        : message.internalDate;
      // Gmail internalDate is in milliseconds
      const date = new Date(timestamp);
      dateStr = date.toISOString();
    } catch {
      return '';
    }
  }
  
  if (!dateStr) return '';

  try {
    const date = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));

    // Format time (12-hour format with AM/PM)
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });

    // Today: just show time (e.g., "2:30 PM")
    if (diffDays === 0) {
      return timeStr;
    }
    
    // This week (last 7 days): show day abbreviation + time (e.g., "Mon 2:30 PM")
    if (diffDays < 7) {
      const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
      return `${dayStr} ${timeStr}`;
    }
    
    // Older: show date (e.g., "Jan 5" or "1/5/2026" if older than current year)
    const currentYear = now.getFullYear();
    const messageYear = date.getFullYear();
    
    if (messageYear === currentYear) {
      // Same year: show month and day (e.g., "Jan 5")
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    } else {
      // Different year: show month, day, year (e.g., "Jan 5, 2025")
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  } catch {
    return '';
  }
}

/**
 * Extract message body (HTML or plain text)
 */
export function getMessageBody(message: GmailMessage): string {
  if (!message.payload) return message.snippet || '';

  // Recursive function to find body part
  const findBodyPart = (payload: GmailPayload, preferHtml = true): string | null => {
    // Check if this part has body data
    if (payload.body?.data) {
      const mimeType = payload.mimeType || '';
      if (preferHtml && mimeType === 'text/html') {
        return decodeBase64Url(payload.body.data);
      } else if (!preferHtml && mimeType === 'text/plain') {
        return decodeBase64Url(payload.body.data);
      }
    }

    // Check parts recursively
    if (payload.parts) {
      for (const part of payload.parts) {
        const body = findBodyPart(part, preferHtml);
        if (body) return body;
      }
    }

    return null;
  };

  // Try HTML first
  const html = findBodyPart(message.payload, true);
  if (html) return html;

  // Fallback to plain text
  const text = findBodyPart(message.payload, false);
  if (text) {
    // Convert plain text to HTML
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }

  return message.snippet || '';
}

/**
 * Extract individual messages from quoted content (for thread display)
 * Parses quoted content to find previous messages in the thread
 */
export function extractThreadMessages(quotedContent: string): Array<{
  sender: string;
  senderName: string;
  date: string;
  content: string;
}> {
  if (!quotedContent || typeof window === 'undefined') {
    return [];
  }

  const messages: Array<{
    sender: string;
    senderName: string;
    date: string;
    content: string;
  }> = [];

  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = quotedContent;

    // Pattern 1: "On [date]... wrote:" followed by content
    const onDatePattern = /On\s+([A-Z][a-z]{2,3},\s+\d{1,2}\s+[A-Z][a-z]{2,3}\s+\d{4}\s+at\s+\d{1,2}:\d{2}(?:\s+[AP]M)?)\s+([^<\n]+)\s+wrote:/gi;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    let match;
    
    while ((match = onDatePattern.exec(textContent)) !== null) {
      const date = match[1];
      const senderInfo = match[2].trim();
      const matchIndex = match.index;
      
      // Extract sender name and email
      const emailMatch = senderInfo.match(/<(.+?)>/);
      const senderEmail = emailMatch ? emailMatch[1] : senderInfo;
      const senderNameMatch = senderInfo.match(/^(.+?)\s*</);
      const senderName = senderNameMatch ? senderNameMatch[1].trim().replace(/"/g, '') : senderEmail;
      
      // Get content between this match and the next (or end)
      const nextMatch = onDatePattern.exec(textContent);
      onDatePattern.lastIndex = matchIndex + match[0].length; // Reset for next iteration
      
      const contentStart = matchIndex + match[0].length;
      const contentEnd = nextMatch ? nextMatch.index : textContent.length;
      const content = textContent.substring(contentStart, contentEnd).trim();
      
      if (content.length > 10) { // Only add if there's substantial content
        messages.push({
          sender: senderEmail,
          senderName: senderName || senderEmail,
          date: date,
          content: content,
        });
      }
    }
  } catch (error) {
    console.warn('Error extracting thread messages:', error);
  }

  return messages;
}

/**
 * Split message body into new content and quoted content
 * Returns { newContent: string, quotedContent: string }
 */
export function splitMessageContent(body: string): { newContent: string; quotedContent: string } {
  if (!body || typeof window === 'undefined') {
    return { newContent: body, quotedContent: '' };
  }

  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = body;

    // Find the start of quoted content
    // Common patterns that indicate start of quoted content:
    // 1. Blockquotes
    // 2. "On [date]... wrote:"
    // 3. "--- Original Message ---"
    // 4. Gmail signature/quote divs
    // 5. Lines starting with ">"

    let quotedStartIndex = -1;
    const htmlContent = tempDiv.innerHTML;

    // Pattern 1: "On [date]... wrote:" - most common in Gmail
    const onDatePattern = /(<br\s*\/?>|<p[^>]*>|^)(On\s+[A-Z][a-z]{2,3},\s+\d{1,2}\s+[A-Z][a-z]{2,3}\s+\d{4}\s+at\s+\d{1,2}:\d{2}(?:\s+[AP]M)?\s+[^<\n]+wrote:)/gi;
    const onDateMatch = htmlContent.search(onDatePattern);
    if (onDateMatch !== -1 && (quotedStartIndex === -1 || onDateMatch < quotedStartIndex)) {
      quotedStartIndex = onDateMatch;
    }

    // Pattern 2: "--- Original Message ---"
    const separatorPattern = /(<br\s*\/?>|<p[^>]*>|^)(-{2,}\s*(?:Original\s+Message|Forwarded\s+Message)[^-]*-{2,})/gi;
    const separatorMatch = htmlContent.search(separatorPattern);
    if (separatorMatch !== -1 && (quotedStartIndex === -1 || separatorMatch < quotedStartIndex)) {
      quotedStartIndex = separatorMatch;
    }

    // Pattern 3: Blockquotes
    const blockquotes = tempDiv.querySelectorAll('blockquote');
    if (blockquotes.length > 0) {
      const firstBlockquote = blockquotes[0];
      const blockquoteText = firstBlockquote.outerHTML;
      const blockquoteIndex = htmlContent.indexOf(blockquoteText);
      if (blockquoteIndex !== -1 && (quotedStartIndex === -1 || blockquoteIndex < quotedStartIndex)) {
        quotedStartIndex = blockquoteIndex;
      }
    }

    // Pattern 4: Gmail signature/quote divs
    const gmailQuotes = tempDiv.querySelectorAll('[class*="gmail_signature"], [class*="gmail_quote"]');
    if (gmailQuotes.length > 0) {
      const firstQuote = gmailQuotes[0];
      const quoteText = firstQuote.outerHTML;
      const quoteIndex = htmlContent.indexOf(quoteText);
      if (quoteIndex !== -1 && (quotedStartIndex === -1 || quoteIndex < quotedStartIndex)) {
        quotedStartIndex = quoteIndex;
      }
    }

    // Pattern 5: Multiple consecutive lines starting with ">" (at least 3 lines)
    const quoteMarkerPattern = /((?:<br\s*\/?>|^)\s*(?:&gt;|>)\s*[^<]+(?:(?:<br\s*\/?>|$)\s*(?:&gt;|>)\s*[^<]+){2,})/gi;
    const quoteMarkerMatch = htmlContent.search(quoteMarkerPattern);
    if (quoteMarkerMatch !== -1 && (quotedStartIndex === -1 || quoteMarkerMatch < quotedStartIndex)) {
      quotedStartIndex = quoteMarkerMatch;
    }

    if (quotedStartIndex === -1) {
      // No quoted content found
      return { newContent: body, quotedContent: '' };
    }

    // Split the content
    const newContent = htmlContent.substring(0, quotedStartIndex).trim();
    const quotedContent = htmlContent.substring(quotedStartIndex).trim();

    return {
      newContent: newContent || body,
      quotedContent: quotedContent || '',
    };
  } catch (error) {
    console.warn('Error splitting message content:', error);
    return { newContent: body, quotedContent: '' };
  }
}

/**
 * Process quoted content HTML to style it like Gmail
 */
export function processQuotedContent(quotedContent: string): string {
  if (!quotedContent || typeof window === 'undefined') return quotedContent;

  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = quotedContent;

    // Style blockquotes
    const blockquotes = tempDiv.querySelectorAll('blockquote');
    blockquotes.forEach((blockquote) => {
      blockquote.classList.add('gmail-quoted-message');
    });

    // Style Gmail signature/quote divs
    const signatures = tempDiv.querySelectorAll('[class*="gmail_signature"], [class*="gmail_quote"]');
    signatures.forEach((sig) => {
      sig.classList.add('gmail-quoted-content');
    });

    let processedHtml = tempDiv.innerHTML;

    // Mark quoted headers
    const onDatePattern = /(<br\s*\/?>|<p[^>]*>|^)(On\s+[A-Z][a-z]{2,3},\s+\d{1,2}\s+[A-Z][a-z]{2,3}\s+\d{4}\s+at\s+\d{1,2}:\d{2}(?:\s+[AP]M)?\s+[^<\n]+wrote:)/gi;
    processedHtml = processedHtml.replace(onDatePattern, (_match, prefix, content) => {
      return `${prefix || ''}<div class="gmail-quoted-header">${content}</div>`;
    });

    // Mark separators
    const separatorPattern = /(<br\s*\/?>|<p[^>]*>|^)(-{2,}\s*(?:Original\s+Message|Forwarded\s+Message)[^-]*-{2,})/gi;
    processedHtml = processedHtml.replace(separatorPattern, (_match, prefix, content) => {
      return `${prefix || ''}<div class="gmail-quoted-separator">${content}</div>`;
    });

    // Wrap quoted blocks
    const quoteMarkerPattern = /((?:<br\s*\/?>|^)\s*(?:&gt;|>)\s*[^<]+(?:(?:<br\s*\/?>|$)\s*(?:&gt;|>)\s*[^<]+)*)/gi;
    processedHtml = processedHtml.replace(quoteMarkerPattern, (match) => {
      const cleaned = match.replace(/^((?:<br\s*\/?>|^)\s*(?:&gt;|>)\s*)/gm, '').trim();
      if (cleaned && cleaned.length > 10) {
        return `<div class="gmail-quoted-block">${cleaned}</div>`;
      }
      return match;
    });

    return processedHtml;
  } catch (error) {
    console.warn('Error processing quoted content:', error);
    return quotedContent;
  }
}

/**
 * Find all attachments in a message payload
 */
export function findAttachments(payload: GmailPayload): Array<{
  filename: string;
  mimeType: string;
  size: number;
  attachmentId?: string;
}> {
  const attachments: Array<{
    filename: string;
    mimeType: string;
    size: number;
    attachmentId?: string;
  }> = [];

  const traverse = (part: GmailPayload) => {
    if (part.filename) {
      attachments.push({
        filename: part.filename,
        mimeType: part.mimeType || 'application/octet-stream',
        size: part.body?.size || 0,
        attachmentId: part.body?.attachmentId,
      });
    }

    if (part.parts) {
      part.parts.forEach(traverse);
    }
  };

  traverse(payload);
  return attachments;
}

/**
 * Check if message is unread
 */
export function isUnread(message: GmailMessage): boolean {
  return message.labelIds?.includes('UNREAD') || false;
}

/**
 * Check if message is starred
 */
export function isStarred(message: GmailMessage): boolean {
  return message.labelIds?.includes('STARRED') || false;
}

/**
 * Decode Base64 URL encoded string with proper UTF-8 support
 */
function decodeBase64Url(base64Url: string): string {
  try {
    // Replace URL-safe characters
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Decode Base64 to binary string
    const binaryString = atob(base64);
    
    // Convert binary string to bytes
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Decode bytes as UTF-8
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (error) {
    console.error('Failed to decode base64:', error);
    // Fallback: try direct atob if UTF-8 decoding fails
    try {
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      return atob(base64);
    } catch (fallbackError) {
      console.error('Fallback decode also failed:', fallbackError);
      return '';
    }
  }
}

/**
 * Extract email addresses from header value
 */
export function extractEmails(headerValue: string): string[] {
  if (!headerValue) return [];
  
  // Match email addresses (handles both "Name <email>" and "email" formats)
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  return headerValue.match(emailRegex) || [];
}

/**
 * Get profile picture URL for a Gmail sender
 * 
 * Currently returns undefined - photos are not supported yet.
 * The Avatar component will fall back to showing initials.
 * 
 * For future implementation, consider:
 * - Using Google People API to get verified photos from Gmail contacts
 * - Only showing photos for emails in the user's verified contacts
 * 
 * @param _message - Gmail message object (not used yet, reserved for future implementation)
 * @returns Always returns undefined (will show initials)
 */
export function getSenderPhotoUrl(_message: GmailMessage): string | undefined {
  // Photos are not implemented yet
  // Future: Could implement Google People API here to get verified photos
  // Example: GET https://people.googleapis.com/v1/people/{personId}?personFields=photos
  
  return undefined;
}

