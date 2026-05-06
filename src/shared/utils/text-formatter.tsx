import React from 'react'

/**
 * WhatsApp-style text formatter with HTML support
 * Supports:
 * - **bold** text (markdown)
 * - *italic* text (markdown)
 * - _italic_ text (alternative markdown)
 * - ~~strikethrough~~ text (markdown)
 * - URLs (auto-link)
 * - Line breaks
 * - HTML tags: <b>, <strong>, <i>, <em>, <a>, <br>, <p>, <u>, <s>, etc.
 */

interface FormattedTextProps {
  text: string
  className?: string
}

export function FormattedText({ text, className }: FormattedTextProps) {
  if (!text) return null

  // Check if text contains HTML tags
  const hasHtmlTags = /<[^>]+>/.test(text)
  
  if (hasHtmlTags) {
    // Use HTML formatter
    return (
      <span className={className}>
        {formatHtmlText(text)}
      </span>
    )
  }

  // Use markdown formatter for non-HTML text
  // Split by newlines first to preserve line breaks
  const lines = text.split('\n')
  
  return (
    <span className={className}>
      {lines.map((line, lineIndex) => {
        const formattedLine = formatLine(line)
        return (
          <React.Fragment key={lineIndex}>
            {formattedLine}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        )
      })}
    </span>
  )
}

function formatLine(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let key = 0

  // Regex patterns - order matters for priority
  const boldPattern = /\*\*([^*]+)\*\*/g
  const strikethroughPattern = /~~([^~]+)~~/g
  const italicPattern = /(?<!\*)\*([^*]+)\*(?!\*)/g
  const underlineItalicPattern = /_([^_]+)_/g
  // Enhanced URL pattern: matches http://, https://, www., and common domains
  const urlPattern = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s<>"']*)?)/gi

  // Find all matches with their positions
  const matches: Array<{
    start: number
    end: number
    type: 'url' | 'bold' | 'italic' | 'underlineItalic' | 'strikethrough'
    content: string
    displayText?: string // For URLs: original text to display
    normalizedUrl?: string // For URLs: normalized URL for href
  }> = []

  // Find bold text (**text**) - highest priority
  const textCopy = text
  
  // Reset regex
  boldPattern.lastIndex = 0
  let boldMatch: RegExpExecArray | null
  while ((boldMatch = boldPattern.exec(textCopy)) !== null) {
    matches.push({
      start: boldMatch.index,
      end: boldMatch.index + boldMatch[0].length,
      type: 'bold',
      content: boldMatch[1],
    })
  }

  // Find strikethrough text (~~text~~)
  strikethroughPattern.lastIndex = 0
  let strikethroughMatch: RegExpExecArray | null
  while ((strikethroughMatch = strikethroughPattern.exec(textCopy)) !== null) {
    // Check if not overlapping with bold
    const overlapsBold = matches.some(
      (m) => m.type === 'bold' && !(strikethroughMatch!.index + strikethroughMatch![0].length <= m.start || strikethroughMatch!.index >= m.end)
    )
    if (!overlapsBold) {
      matches.push({
        start: strikethroughMatch.index,
        end: strikethroughMatch.index + strikethroughMatch[0].length,
        type: 'strikethrough',
        content: strikethroughMatch[1],
      })
    }
  }

  // Find italic text (*text* but not **text**)
  italicPattern.lastIndex = 0
  let italicMatch: RegExpExecArray | null
  while ((italicMatch = italicPattern.exec(textCopy)) !== null) {
    // Check if not part of bold or strikethrough
    const overlaps = matches.some(
      (m) => !(italicMatch!.index + italicMatch![0].length <= m.start || italicMatch!.index >= m.end)
    )
    if (!overlaps) {
      matches.push({
        start: italicMatch.index,
        end: italicMatch.index + italicMatch[0].length,
        type: 'italic',
        content: italicMatch[1],
      })
    }
  }

  // Find underline italic text (_text_)
  underlineItalicPattern.lastIndex = 0
  let underlineItalicMatch: RegExpExecArray | null
  while ((underlineItalicMatch = underlineItalicPattern.exec(textCopy)) !== null) {
    const overlaps = matches.some(
      (m) => !(underlineItalicMatch!.index + underlineItalicMatch![0].length <= m.start || underlineItalicMatch!.index >= m.end)
    )
    if (!overlaps) {
      matches.push({
        start: underlineItalicMatch.index,
        end: underlineItalicMatch.index + underlineItalicMatch[0].length,
        type: 'underlineItalic',
        content: underlineItalicMatch[1],
      })
    }
  }

  // Find URLs (lowest priority, don't overlap with formatting)
  urlPattern.lastIndex = 0
  let urlMatch: RegExpExecArray | null
  while ((urlMatch = urlPattern.exec(textCopy)) !== null) {
    const overlaps = matches.some(
      (m) => !(urlMatch!.index + urlMatch![0].length <= m.start || urlMatch!.index >= m.end)
    )
    if (!overlaps) {
      const originalUrl = urlMatch[0]
      // Normalize URL internally: add https:// if missing (only for href, not display)
      let normalizedUrl = originalUrl
      if (!normalizedUrl.match(/^https?:\/\//i)) {
        normalizedUrl = `https://${normalizedUrl}`
      }
      
      matches.push({
        start: urlMatch.index,
        end: urlMatch.index + urlMatch[0].length,
        type: 'url',
        content: originalUrl, // Keep original for display
        displayText: originalUrl, // Show original text to user
        normalizedUrl: normalizedUrl, // Use normalized for href
      })
    }
  }

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start)

  // Build parts
  let lastIndex = 0

  matches.forEach((match) => {
    // Add text before match
    if (match.start > lastIndex) {
      const beforeText = text.substring(lastIndex, match.start)
      if (beforeText) {
        parts.push(
          <React.Fragment key={key++}>{beforeText}</React.Fragment>
        )
      }
    }

    // Add formatted match (no recursion to avoid infinite loops)
    switch (match.type) {
      case 'url':
        // Ensure URL always opens in new tab
        // Use normalized URL for href, but show original text to user
        const urlToDisplay = match.displayText || match.content
        const urlForHref = match.normalizedUrl || match.content
        
        parts.push(
          <a
            key={key++}
            href={urlForHref}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline underline-offset-2 hover:opacity-80 break-all"
            onClick={(e) => {
              e.stopPropagation()
              // Ensure it opens in new tab even if target="_blank" is blocked
              // Only override if it's a normal click (not Ctrl/Cmd+Click)
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault()
                window.open(urlForHref, '_blank', 'noopener,noreferrer')
              }
            }}
          >
            {urlToDisplay}
          </a>
        )
        break
      case 'bold':
        parts.push(
          <strong key={key++} className="font-semibold">
            {match.content}
          </strong>
        )
        break
      case 'italic':
        parts.push(
          <em key={key++} className="italic">
            {match.content}
          </em>
        )
        break
      case 'underlineItalic':
        parts.push(
          <em key={key++} className="italic underline">
            {match.content}
          </em>
        )
        break
      case 'strikethrough':
        parts.push(
          <span key={key++} className="line-through">
            {match.content}
          </span>
        )
        break
    }

    lastIndex = match.end
  })

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex)
    if (remainingText) {
      parts.push(
        <React.Fragment key={key++}>{remainingText}</React.Fragment>
      )
    }
  }

  return parts.length > 0 ? parts : [text]
}

/**
 * Formats HTML text by parsing HTML tags and converting them to React elements
 * Supports common HTML tags: <b>, <strong>, <i>, <em>, <a>, <br>, <p>, <u>, <s>, etc.
 */
interface HtmlNode {
  type: 'text' | 'tag'
  content?: string
  tag?: string
  props?: Record<string, string>
  isClosing?: boolean
  isSelfClosing?: boolean
}

function formatHtmlText(html: string): React.ReactNode[] {
  let key = 0
  
  // Parse HTML tags using a simple recursive approach
  const nodes: HtmlNode[] = []
  
  // Simple HTML parser: split by tags
  const tagPattern = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)(\/?)>|([^<]+)/g
  
  // Self-closing tags that don't need a closing tag
  const selfClosingTags = new Set(['br', 'hr', 'img', 'input', 'meta', 'link'])
  
  let match
  while ((match = tagPattern.exec(html)) !== null) {
    if (match[1] === '/' || match[2]) {
      // It's a tag (opening or closing)
      const isClosing = match[1] === '/'
      const tagName = (match[2] || '').toLowerCase()
      const attrs = match[3] || ''
      const isSelfClosing = match[4] === '/' || selfClosingTags.has(tagName)
      
      if (tagName) {
        // Parse attributes
        const props: Record<string, string> = {}
        if (attrs) {
          const attrPattern = /(\w+)=["']([^"']+)["']/g
          let attrMatch
          while ((attrMatch = attrPattern.exec(attrs)) !== null) {
            props[attrMatch[1]] = attrMatch[2]
          }
        }
        
        nodes.push({ 
          type: 'tag', 
          tag: tagName, 
          props, 
          isClosing,
          content: '', // Required by type, but not used
          isSelfClosing
        })
      }
    } else if (match[5]) {
      // It's text content
      nodes.push({ type: 'text', content: match[5] })
    }
  }
  
  // Convert nodes to React elements
  return buildReactNodes(nodes, key)
}

function buildReactNodes(nodes: HtmlNode[], startKey: number = 0): React.ReactNode[] {
  const result: React.ReactNode[] = []
  let key = startKey
  let i = 0
  
  while (i < nodes.length) {
    const node = nodes[i]
    
    if (node.type === 'text' && node.content) {
      // Text nodes - process markdown formatting within text
      const lines = node.content.split('\n')
      lines.forEach((line, lineIndex) => {
        if (line.trim() || lineIndex === 0) {
          const formatted = formatLine(line)
          result.push(...formatted.map((part) => (
            <React.Fragment key={key++}>{part}</React.Fragment>
          )))
        }
        if (lineIndex < lines.length - 1) {
          result.push(<br key={key++} />)
        }
      })
      i++
    } else if (node.type === 'tag' && node.tag) {
      if (node.isClosing) {
        // Closing tag - should have been handled, skip
        i++
      } else if (node.isSelfClosing) {
        // Self-closing tag - render immediately
        const tagName = node.tag
        const element = createHtmlElement(tagName, node.props || {}, [], key)
        result.push(element)
        key++
        i++
      } else {
        // Opening tag - find matching closing tag
        const tagName = node.tag
        let j = i + 1
        let depth = 1
        const childrenNodes: HtmlNode[] = []
        
        while (j < nodes.length && depth > 0) {
          const nextNode = nodes[j]
          if (nextNode.type === 'tag' && nextNode.tag === tagName && !nextNode.isSelfClosing) {
            if (nextNode.isClosing) {
              depth--
            } else {
              depth++
            }
          }
          if (depth > 0) {
            childrenNodes.push(nextNode)
          }
          j++
        }
        
        if (depth === 0) {
          // Found matching closing tag
          const children = buildReactNodes(childrenNodes, key + 1000)
          const element = createHtmlElement(tagName, node.props || {}, children, key)
          result.push(element)
          key++
          i = j
        } else {
          // No matching closing tag found, treat opening tag as plain text
          // and continue with next node
          i++
        }
      }
    } else {
      i++
    }
  }
  
  return result
}

function createHtmlElement(
  tag: string,
  props: Record<string, string>,
  children: React.ReactNode[],
  key: number
): React.ReactElement {
  switch (tag) {
    case 'b':
    case 'strong':
      return <strong key={key} className="font-semibold">{children}</strong>
    
    case 'i':
    case 'em':
      return <em key={key} className="italic">{children}</em>
    
    case 'u':
      return <u key={key} className="underline">{children}</u>
    
    case 's':
    case 'strike':
    case 'del':
      return <span key={key} className="line-through">{children}</span>
    
    case 'a':
      const href = props.href || '#'
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="underline underline-offset-2 hover:opacity-80 break-all"
          onClick={(e) => {
            e.stopPropagation()
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault()
              window.open(href, '_blank', 'noopener,noreferrer')
            }
          }}
        >
          {children}
        </a>
      )
    
    case 'p':
      return <p key={key} className="mb-2">{children}</p>
    
    case 'br':
      return <br key={key} />
    
    case 'ul':
      return <ul key={key} className="list-disc pl-5 my-2">{children}</ul>
    
    case 'ol':
      return <ol key={key} className="list-decimal pl-5 my-2">{children}</ol>
    
    case 'li':
      return <li key={key} className="my-1">{children}</li>
    
    case 'h1':
      return <h1 key={key} className="text-2xl font-bold my-2">{children}</h1>
    
    case 'h2':
      return <h2 key={key} className="text-xl font-bold my-2">{children}</h2>
    
    case 'h3':
      return <h3 key={key} className="text-lg font-semibold my-2">{children}</h3>
    
    case 'code':
      return <code key={key} className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{children}</code>
    
    case 'pre':
      return <pre key={key} className="bg-muted p-2 rounded overflow-x-auto text-xs font-mono my-2">{children}</pre>
    
    default:
      // For unknown tags, render as span
      return <span key={key}>{children}</span>
  }
}

