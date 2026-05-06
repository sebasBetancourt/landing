// Gmail API Types - mirrors backend types for consistency

export interface GmailMessage {
  id?: string;
  threadId?: string;
  labelIds?: string[];
  snippet?: string;
  historyId?: string;
  internalDate?: number | string; // Gmail API can return this as string or number
  payload?: GmailPayload;
  sizeEstimate?: number;
  raw?: string; // Base64url encoded
  headers?: Record<string, string>;
}

export interface GmailPayload {
  partId?: string;
  mimeType?: string;
  filename?: string;
  headers?: GmailHeader[];
  body?: GmailBody;
  parts?: GmailPayload[];
}

export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailBody {
  size?: number;
  data?: string; // Base64url encoded
  attachmentId?: string;
}

export interface GmailLabel {
  id: string;
  name: string;
  messageListVisibility?: string;
  labelListVisibility?: string;
  type?: string;
  messagesTotal?: number;
  messagesUnread?: number;
  threadsTotal?: number;
  threadsUnread?: number;
  color?: GmailLabelColor;
}

export interface GmailLabelColor {
  textColor?: string;
  backgroundColor?: string;
}

export interface GmailThread {
  id: string;
  snippet?: string;
  historyId?: string;
  messages?: GmailMessage[];
}

export interface GmailDraft {
  id?: string;
  message?: GmailMessage;
}

// Request/Response types for API calls

export interface SendMessageRequest {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  bodyHtml?: string;
  inReplyTo?: string;
  references?: string;
  threadId?: string;
  headers?: Record<string, string>;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  contentType: string;
  data: string; // Base64 encoded
}

export interface ListMessagesRequest {
  labelIds?: string[];
  q?: string; // Query string
  maxResults?: number;
  pageToken?: string;
  includeSpamTrash?: boolean;
}

export interface ListMessagesResponse {
  messages: GmailMessage[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
}

export interface ModifyMessageRequest {
  addLabelIds?: string[];
  removeLabelIds?: string[];
}

export interface GmailStatus {
  exists: boolean;
  instanceId?: number;
  status?: string;
  hasOAuthTokens?: boolean;
  enabled?: boolean;
  lastSync?: string;
  lastError?: string;
}

export interface GmailSetupRequest {
  agentInstanceId: number;
  config: {
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
  };
  name?: string;
}

export interface GmailSetupResponse {
  message: string;
  instance: {
    id: number;
    name: string;
    status: string;
    config: any;
  };
  isNew: boolean;
}

export interface OAuthInitResponse {
  authUrl: string;
  state: string;
}

export interface TestConnectionResponse {
  message: string;
  instanceId: string;
  status: string;
  labels: GmailLabel[];
}

export interface HealthCheckResponse {
  healthy: boolean;
  issues: string[];
  activeInstances: number;
  totalInstances: number;
  timestamp: string;
}

// Common Gmail label IDs
export const GMAIL_LABELS = {
  INBOX: 'INBOX',
  SENT: 'SENT',
  DRAFT: 'DRAFT',
  TRASH: 'TRASH',
  SPAM: 'SPAM',
  STARRED: 'STARRED',
  IMPORTANT: 'IMPORTANT',
  UNREAD: 'UNREAD',
} as const;

// Message format options
export type MessageFormat = 'minimal' | 'full' | 'raw' | 'metadata';
