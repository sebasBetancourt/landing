/**
 * Predefined Agent Templates
 * Ready-to-use agent configurations for common use cases
 */

import {
    AgentType,
    MemoryType,
    ModelProvider,
    type AgentTemplate
} from '@/shared/types/agent-configuration';

// ============================================================================
// Simple Agent Templates
// ============================================================================

const SIMPLE_CHAT_ASSISTANT: AgentTemplate = {
  name: 'Simple Chat Assistant',
  description: 'Basic conversational assistant for customer support',
  type: AgentType.SIMPLE,
  category: 'Support',
  icon: '💬',
  tags: ['chat', 'support', 'basic'],
  isPublic: true,
  config: {
    name: 'Simple Chat Assistant',
    type: AgentType.SIMPLE,
    version: '1.0.0',
    description: 'A helpful assistant for answering customer questions',
    model: {
      provider: ModelProvider.ANTHROPIC,
      name: 'claude-3-haiku',
      temperature: 0.7,
      maxTokens: 2048
    },
    prompts: {
      system: 'You are a helpful customer service assistant. Be friendly, professional, and concise in your responses.',
      user: 'Customer question: {{question}}'
    },
    memory: {
      type: MemoryType.SHORT_TERM,
      maxHistory: 10
    }
  }
};

const RAG_KNOWLEDGE_ASSISTANT: AgentTemplate = {
  name: 'RAG Knowledge Assistant',
  description: 'Assistant with RAG for answering questions based on documents',
  type: AgentType.LANGGRAPH,
  category: 'Support',
  icon: '📚',
  tags: ['rag', 'knowledge', 'documents', 'support'],
  isPublic: true,
  config: {
    name: 'RAG Knowledge Assistant',
    type: AgentType.LANGGRAPH,
    version: '1.0.0',
    description: 'Retrieval-Augmented Generation assistant for document-based Q&A',
    model: {
      provider: ModelProvider.ANTHROPIC,
      name: 'claude-3-sonnet',
      temperature: 0.7,
      maxTokens: 2048
    },
    vectorDatabase: {
      type: 'none',
      collection: 'knowledge_base',
      config: {
        topK: 5,
        scoreThreshold: 0.7
      }
    },
    prompts: {
      system: 'You are a knowledgeable assistant. Answer questions based on the provided context. If you don\'t know the answer, say so.',
      user: 'Question: {{question}}\n\nContext: {{context}}'
    },
    graph: {
      state: {
        messages: 'list',
        question: 'string',
        context: 'list',
        answer: 'string',
        is_relevant: 'boolean',
        retries: 'int'
      },
      nodes: [
        {
          id: 'search',
          function: 'search_knowledge_base',
          label: 'Search Knowledge Base',
          config: {
            maxResults: 5,
            minScore: 0.7
          },
          position: { x: 100, y: 100 }
        },
        {
          id: 'grade_documents',
          function: 'grade_relevance',
          label: 'Grade Relevance',
          config: {
            threshold: 0.7
          },
          position: { x: 250, y: 100 }
        },
        {
          id: 'rewrite_question',
          function: 'rewrite_query',
          label: 'Rewrite Question',
          config: {
            model: 'claude-3-haiku'
          },
          position: { x: 250, y: 250 }
        },
        {
          id: 'generate_response',
          function: 'generate_answer',
          label: 'Generate Response',
          config: {
            model: 'claude-3-sonnet'
          },
          position: { x: 400, y: 100 }
        }
      ],
      edges: [
        { from: 'START', to: 'search', label: 'Start' },
        { from: 'search', to: 'grade_documents', label: 'Retrieved docs' },
        { from: 'grade_documents', to: 'rewrite_question', condition: 'not is_relevant and retries < 3', label: 'Not relevant' },
        { from: 'grade_documents', to: 'generate_response', condition: 'is_relevant', label: 'Relevant' },
        { from: 'rewrite_question', to: 'search', label: 'Retry search' },
        { from: 'generate_response', to: 'END', label: 'Complete' }
      ],
      checkpointer: {
        type: 'memory',
        config: {
          maxHistory: 10
        }
      }
    }
  }
};

// ============================================================================
// Workflow Agent Templates
// ============================================================================

const LEAD_PROCESSING_PIPELINE: AgentTemplate = {
  name: 'Lead Processing Pipeline',
  description: 'Automated pipeline for processing and qualifying leads',
  type: AgentType.WORKFLOW,
  category: 'Sales',
  icon: '🎯',
  tags: ['sales', 'leads', 'qualification', 'pipeline'],
  isPublic: true,
  config: {
    name: 'Lead Processing Pipeline',
    type: AgentType.WORKFLOW,
    version: '1.0.0',
    description: 'Automates lead intake, enrichment, scoring, and routing',
    model: {
      provider: ModelProvider.ANTHROPIC,
      name: 'claude-3-haiku',
      temperature: 0.3,
      maxTokens: 1024
    },
    prompts: {
      system: 'You are a lead qualification system. Extract and analyze lead information accurately.'
    },
    workflow: {
      nodes: [
        {
          id: 'extract_data',
          type: 'extractor',
          label: 'Extract Lead Data',
          config: {
            fields: ['name', 'email', 'phone', 'company', 'message']
          },
          position: { x: 100, y: 100 }
        },
        {
          id: 'validate_data',
          type: 'validator',
          label: 'Validate Data',
          config: {
            rules: {
              email: 'required|email',
              name: 'required|min:2'
            }
          },
          position: { x: 250, y: 100 }
        },
        {
          id: 'enrich_data',
          type: 'enricher',
          label: 'Enrich with External Data',
          config: {
            provider: 'clearbit',
            fields: ['company_size', 'industry', 'location']
          },
          position: { x: 400, y: 100 }
        },
        {
          id: 'score_lead',
          type: 'scorer',
          label: 'Score Lead',
          config: {
            model: 'lead_scoring_v1',
            factors: ['company_size', 'industry', 'message_intent']
          },
          position: { x: 550, y: 100 }
        },
        {
          id: 'route_lead',
          type: 'router',
          label: 'Route Lead',
          config: {
            rules: [
              { condition: 'score > 80', action: 'hot_lead', priority: 1 },
              { condition: 'score > 50', action: 'warm_lead', priority: 2 },
              { condition: 'score <= 50', action: 'cold_lead', priority: 3 }
            ]
          },
          position: { x: 700, y: 100 }
        },
        {
          id: 'save_to_crm',
          type: 'crm_integration',
          label: 'Save to CRM',
          config: {
            provider: 'salesforce',
            object: 'Lead'
          },
          position: { x: 850, y: 100 }
        },
        {
          id: 'notify_team',
          type: 'notification',
          label: 'Notify Sales Team',
          config: {
            channel: 'email',
            template: 'new_lead_notification'
          },
          position: { x: 1000, y: 100 }
        }
      ],
      edges: [
        { from: 'extract_data', to: 'validate_data' },
        { from: 'validate_data', to: 'enrich_data' },
        { from: 'enrich_data', to: 'score_lead' },
        { from: 'score_lead', to: 'route_lead' },
        { from: 'route_lead', to: 'save_to_crm' },
        { from: 'save_to_crm', to: 'notify_team' }
      ]
    }
  }
};

const CUSTOMER_SUPPORT_TRIAGE: AgentTemplate = {
  name: 'Customer Support Triage',
  description: 'Automatically classify and route support tickets',
  type: AgentType.WORKFLOW,
  category: 'Support',
  icon: '🎫',
  tags: ['support', 'tickets', 'triage', 'routing'],
  isPublic: true,
  config: {
    name: 'Customer Support Triage',
    type: AgentType.WORKFLOW,
    version: '1.0.0',
    description: 'Classifies support requests and routes to appropriate team',
    model: {
      provider: ModelProvider.ANTHROPIC,
      name: 'claude-3-sonnet',
      temperature: 0.2,
      maxTokens: 1024
    },
    prompts: {
      system: 'You are a support ticket classification system. Analyze tickets and categorize them accurately.'
    },
    workflow: {
      nodes: [
        {
          id: 'classify_ticket',
          type: 'classifier',
          label: 'Classify Ticket',
          config: {
            categories: ['technical', 'billing', 'general', 'urgent'],
            model: 'claude-3-sonnet'
          },
          position: { x: 100, y: 100 }
        },
        {
          id: 'detect_urgency',
          type: 'urgency_detector',
          label: 'Detect Urgency',
          config: {
            keywords: ['urgent', 'emergency', 'critical', 'down', 'not working'],
            model: 'claude-3-sonnet'
          },
          position: { x: 250, y: 100 }
        },
        {
          id: 'search_kb',
          type: 'knowledge_search',
          label: 'Search Knowledge Base',
          config: {
            collection: 'support_kb',
            topK: 3
          },
          position: { x: 400, y: 100 }
        },
        {
          id: 'generate_draft',
          type: 'response_generator',
          label: 'Generate Draft Response',
          config: {
            model: 'claude-3-sonnet',
            includeContext: true
          },
          position: { x: 550, y: 100 }
        },
        {
          id: 'route_ticket',
          type: 'router',
          label: 'Route Ticket',
          config: {
            rules: [
              { condition: 'is_urgent', action: 'escalate_to_manager' },
              { condition: 'category == "technical"', action: 'assign_to_technical' },
              { condition: 'category == "billing"', action: 'assign_to_billing' },
              { condition: 'category == "general"', action: 'assign_to_general' }
            ]
          },
          position: { x: 700, y: 100 }
        }
      ],
      edges: [
        { from: 'classify_ticket', to: 'detect_urgency' },
        { from: 'detect_urgency', to: 'search_kb' },
        { from: 'search_kb', to: 'generate_draft' },
        { from: 'generate_draft', to: 'route_ticket' }
      ]
    }
  }
};

// ============================================================================
// Multi-Agent System Templates
// ============================================================================

const RESEARCH_TEAM: AgentTemplate = {
  name: 'Research Team',
  description: 'Coordinated team of agents for research tasks',
  type: AgentType.MULTI_AGENT,
  category: 'Operations',
  icon: '🔬',
  tags: ['research', 'team', 'coordination', 'multi-agent'],
  isPublic: true,
  config: {
    name: 'Research Team',
    type: AgentType.MULTI_AGENT,
    version: '1.0.0',
    description: 'Multiple specialized agents working together on research tasks',
    model: {
      provider: ModelProvider.ANTHROPIC,
      name: 'claude-3-sonnet',
      temperature: 0.7,
      maxTokens: 2048
    },
    prompts: {
      system: 'You are coordinating a team of research specialists.'
    },
    multiAgent: {
      coordinator: {
        type: 'supervisor',
        model: {
          provider: ModelProvider.ANTHROPIC,
          name: 'claude-3-sonnet',
          temperature: 0.3,
          maxTokens: 1024
        },
        config: {
          maxIterations: 10,
          timeoutSeconds: 300
        }
      },
      agents: [
        {
          id: 'researcher',
          name: 'Researcher',
          role: 'Research and gather information from various sources',
          description: 'Searches web, documents, and databases for relevant information',
          tools: ['web_search', 'document_search', 'database_query'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-haiku',
            temperature: 0.5
          }
        },
        {
          id: 'analyst',
          name: 'Analyst',
          role: 'Analyze and synthesize research findings',
          description: 'Processes and analyzes data to extract insights',
          tools: ['data_analyzer', 'statistical_tools'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-sonnet',
            temperature: 0.3
          }
        },
        {
          id: 'writer',
          name: 'Writer',
          role: 'Write comprehensive reports based on analysis',
          description: 'Creates well-structured reports and summaries',
          tools: ['text_formatter', 'citation_manager'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-sonnet',
            temperature: 0.7
          }
        },
        {
          id: 'reviewer',
          name: 'Reviewer',
          role: 'Review and improve content quality',
          description: 'Checks for accuracy, clarity, and completeness',
          tools: ['grammar_checker', 'fact_checker'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-haiku',
            temperature: 0.2
          }
        }
      ],
      flow: {
        start: 'researcher',
        transitions: [
          { from: 'researcher', to: 'analyst', condition: 'research_complete' },
          { from: 'analyst', to: 'writer', condition: 'analysis_complete' },
          { from: 'writer', to: 'reviewer', condition: 'draft_complete' },
          { from: 'reviewer', to: 'writer', condition: 'needs_revision' },
          { from: 'reviewer', to: 'end', condition: 'approved' }
        ]
      }
    }
  }
};

const CUSTOMER_SERVICE_TEAM: AgentTemplate = {
  name: 'Customer Service Team',
  description: 'Specialized team for handling customer inquiries',
  type: AgentType.MULTI_AGENT,
  category: 'Support',
  icon: '👥',
  tags: ['support', 'customer-service', 'team', 'multi-agent'],
  isPublic: true,
  config: {
    name: 'Customer Service Team',
    type: AgentType.MULTI_AGENT,
    version: '1.0.0',
    description: 'Coordinated team handling different types of customer requests',
    model: {
      provider: ModelProvider.ANTHROPIC,
      name: 'claude-3-sonnet',
      temperature: 0.7,
      maxTokens: 2048
    },
    prompts: {
      system: 'You are managing a customer service team. Route requests to the right specialist.'
    },
    multiAgent: {
      coordinator: {
        type: 'supervisor',
        model: {
          provider: ModelProvider.ANTHROPIC,
          name: 'claude-3-sonnet',
          temperature: 0.3
        }
      },
      agents: [
        {
          id: 'classifier',
          name: 'Request Classifier',
          role: 'Classify incoming customer requests',
          tools: ['text_classifier'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-haiku',
            temperature: 0.2
          }
        },
        {
          id: 'technical_support',
          name: 'Technical Support',
          role: 'Handle technical issues and troubleshooting',
          tools: ['knowledge_base', 'diagnostic_tools'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-sonnet',
            temperature: 0.5
          }
        },
        {
          id: 'billing_support',
          name: 'Billing Support',
          role: 'Handle billing and payment questions',
          tools: ['billing_system', 'payment_gateway'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-haiku',
            temperature: 0.3
          }
        },
        {
          id: 'general_support',
          name: 'General Support',
          role: 'Handle general inquiries and information requests',
          tools: ['faq_search', 'documentation'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-haiku',
            temperature: 0.7
          }
        },
        {
          id: 'escalation_specialist',
          name: 'Escalation Specialist',
          role: 'Handle escalated or complex issues',
          tools: ['crm', 'ticketing_system'],
          model: {
            provider: ModelProvider.ANTHROPIC,
            name: 'claude-3-sonnet',
            temperature: 0.4
          }
        }
      ],
      flow: {
        start: 'classifier',
        transitions: [
          { from: 'classifier', to: 'technical_support', condition: 'type == "technical"' },
          { from: 'classifier', to: 'billing_support', condition: 'type == "billing"' },
          { from: 'classifier', to: 'general_support', condition: 'type == "general"' },
          { from: 'technical_support', to: 'escalation_specialist', condition: 'needs_escalation' },
          { from: 'billing_support', to: 'escalation_specialist', condition: 'needs_escalation' },
          { from: 'general_support', to: 'escalation_specialist', condition: 'needs_escalation' },
          { from: 'technical_support', to: 'end', condition: 'resolved' },
          { from: 'billing_support', to: 'end', condition: 'resolved' },
          { from: 'general_support', to: 'end', condition: 'resolved' },
          { from: 'escalation_specialist', to: 'end', condition: 'resolved' }
        ]
      }
    }
  }
};

// ============================================================================
// Integration Agent Templates
// ============================================================================

const CRM_SYNC_AGENT: AgentTemplate = {
  name: 'CRM Sync Agent',
  description: 'Synchronize data between systems and CRM',
  type: AgentType.INTEGRATION,
  category: 'Operations',
  icon: '🔄',
  tags: ['integration', 'crm', 'sync', 'automation'],
  isPublic: true,
  config: {
    name: 'CRM Sync Agent',
    type: AgentType.INTEGRATION,
    version: '1.0.0',
    description: 'Automates data synchronization with CRM systems',
    model: {
      provider: ModelProvider.ANTHROPIC,
      name: 'claude-3-haiku',
      temperature: 0.2,
      maxTokens: 1024
    },
    prompts: {
      system: 'You are a data synchronization system. Ensure data accuracy and consistency.'
    },
    integration: {
      triggers: [
        {
          id: 'webhook_trigger',
          type: 'webhook',
          config: {
            path: '/webhook/new-contact',
            method: 'POST',
            authentication: 'api_key'
          }
        },
        {
          id: 'schedule_trigger',
          type: 'schedule',
          config: {
            cron: '0 */6 * * *', // Every 6 hours
            timezone: 'UTC'
          }
        }
      ],
      nodes: [
        {
          id: 'extract_data',
          type: 'transformer',
          label: 'Extract Data',
          config: {
            fields: ['name', 'email', 'phone', 'company'],
            transformations: {
              email: 'lowercase',
              phone: 'normalize'
            }
          },
          position: { x: 100, y: 100 }
        },
        {
          id: 'check_duplicates',
          type: 'database_query',
          label: 'Check for Duplicates',
          config: {
            query: 'SELECT id FROM contacts WHERE email = :email',
            database: 'crm'
          },
          position: { x: 250, y: 100 }
        },
        {
          id: 'enrich_data',
          type: 'http_request',
          label: 'Enrich with External API',
          config: {
            url: 'https://api.clearbit.com/enrich',
            method: 'GET',
            headers: {
              'Authorization': 'Bearer {{env.CLEARBIT_API_KEY}}'
            }
          },
          position: { x: 400, y: 100 }
        },
        {
          id: 'save_to_crm',
          type: 'http_request',
          label: 'Save to CRM',
          config: {
            url: 'https://api.salesforce.com/services/data/v53.0/sobjects/Contact',
            method: 'POST',
            headers: {
              'Authorization': 'Bearer {{env.SALESFORCE_TOKEN}}',
              'Content-Type': 'application/json'
            }
          },
          position: { x: 550, y: 100 }
        },
        {
          id: 'send_notification',
          type: 'email',
          label: 'Send Notification',
          config: {
            to: 'sales@company.com',
            subject: 'New Contact Added to CRM',
            template: 'new_contact_notification'
          },
          position: { x: 700, y: 100 }
        }
      ],
      flow: 'extract_data → check_duplicates → enrich_data → save_to_crm → send_notification'
    }
  }
};

// ============================================================================
// Export All Templates
// ============================================================================

export const AGENT_TEMPLATES: AgentTemplate[] = [
  // Simple Agents
  SIMPLE_CHAT_ASSISTANT,
  RAG_KNOWLEDGE_ASSISTANT,
  
  // Workflow Agents
  LEAD_PROCESSING_PIPELINE,
  CUSTOMER_SUPPORT_TRIAGE,
  
  // Multi-Agent Systems
  RESEARCH_TEAM,
  CUSTOMER_SERVICE_TEAM,
  
  // Integration Agents
  CRM_SYNC_AGENT
];

export const AGENT_TEMPLATES_BY_TYPE = {
  [AgentType.SIMPLE]: [SIMPLE_CHAT_ASSISTANT],
  [AgentType.WORKFLOW]: [LEAD_PROCESSING_PIPELINE, CUSTOMER_SUPPORT_TRIAGE],
  [AgentType.MULTI_AGENT]: [RESEARCH_TEAM, CUSTOMER_SERVICE_TEAM],
  [AgentType.LANGGRAPH]: [RAG_KNOWLEDGE_ASSISTANT],
  [AgentType.INTEGRATION]: [CRM_SYNC_AGENT]
};

export const AGENT_TEMPLATES_BY_CATEGORY = {
  'Support': [SIMPLE_CHAT_ASSISTANT, RAG_KNOWLEDGE_ASSISTANT, CUSTOMER_SUPPORT_TRIAGE, CUSTOMER_SERVICE_TEAM],
  'Sales': [LEAD_PROCESSING_PIPELINE],
  'Operations': [RESEARCH_TEAM, CRM_SYNC_AGENT]
};







