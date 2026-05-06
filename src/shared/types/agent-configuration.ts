/**
 * Agent Configuration Types
 * Defines types for advanced agent configuration system
 * Supports: Simple, Workflow, Multi-Agent, LangGraph, and Integration agents
 */

// ============================================================================
// Enums and Constants
// ============================================================================
// Using const objects instead of enums for erasableSyntaxOnly compatibility

export const AgentType = {
  SIMPLE: 'simple',
  WORKFLOW: 'workflow',
  MULTI_AGENT: 'multi-agent',
  LANGGRAPH: 'langgraph',
  INTEGRATION: 'integration'
} as const;

export type AgentType = typeof AgentType[keyof typeof AgentType];

export const ModelProvider = {
  ANTHROPIC: 'anthropic',
  GOOGLE: 'google',
  LOCAL: 'local'
} as const;

export type ModelProvider = typeof ModelProvider[keyof typeof ModelProvider];

export const ConnectionType = {
  SEQUENTIAL: 'sequential',
  PARALLEL: 'parallel',
  CONDITIONAL: 'conditional',
  LOOP: 'loop',
  HIERARCHICAL: 'hierarchical'
} as const;

export type ConnectionType = typeof ConnectionType[keyof typeof ConnectionType];

export const MemoryType = {
  SHORT_TERM: 'short_term',
  LONG_TERM: 'long_term',
  VECTOR: 'vector'
} as const;

export type MemoryType = typeof MemoryType[keyof typeof MemoryType];

export const WorkflowStatus = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  ARCHIVED: 'archived'
} as const;

export type WorkflowStatus = typeof WorkflowStatus[keyof typeof WorkflowStatus];

// ============================================================================
// Base Configuration Types
// ============================================================================

export interface ModelConfig {
  provider: ModelProvider;
  name: string; // claude-3, etc.
  temperature: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface Tool {
  id: string;
  name: string;
  displayName?: string;
  description: string;
  category?: string; // search, transform, api, etc.
  parameters?: Record<string, any>;
  config?: Record<string, any>;
}

export interface VectorDatabaseConfig {
  type: string; // pinecone, weaviate, chroma, etc.
  collection: string;
  config?: Record<string, any>;
}

export interface PromptConfig {
  system: string;
  user?: string;
  assistant?: string;
  functions?: FunctionPrompt[];
}

export interface FunctionPrompt {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface MemoryConfig {
  type: MemoryType;
  config?: Record<string, any>;
  maxHistory?: number;
  persistToDisk?: boolean;
}

export interface SecurityConfig {
  apiKeyRequired: boolean;
  rateLimiting?: {
    maxRequests: number;
    windowMs: number;
  };
  allowedDomains?: string[];
  requireAuthentication?: boolean;
}

// ============================================================================
// Agent Connections
// ============================================================================

export interface AgentConnection {
  id?: number;
  sourceAgentId: number;
  targetAgentId: number;
  connectionType: ConnectionType;
  condition?: string; // for conditional connections
  priority?: number;
  config?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  sourceAgent?: any;
  targetAgent?: any;
}

// ============================================================================
// Workflow Configuration
// ============================================================================

export interface WorkflowNode {
  id: string;
  type: string; // classifier, router, transformer, api_call, agent_call, etc.
  label?: string;
  config: Record<string, any>;
  position?: { x: number; y: number }; // for visual editor
}

export interface WorkflowEdge {
  id?: string;
  from: string;
  to: string;
  condition?: string;
  label?: string;
}

export interface WorkflowConfig {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  variables?: Record<string, any>; // workflow-level variables
}

// ============================================================================
// LangGraph Configuration
// ============================================================================

export interface GraphNode {
  id: string;
  function: string; // function name to execute
  label?: string;
  config: Record<string, any>;
  position?: { x: number; y: number };
}

export interface GraphEdge {
  id?: string;
  from: string;
  to: string;
  condition?: string; // conditional routing
  label?: string;
}

export interface GraphStateSchema {
  [key: string]: string; // field name -> type (string, list, dict, etc.)
}

export interface GraphConfig {
  state: GraphStateSchema;
  nodes: GraphNode[];
  edges: GraphEdge[];
  checkpointer?: {
    type: string; // memory, redis, postgres
    config?: Record<string, any>;
  };
}

// ============================================================================
// Multi-Agent Configuration
// ============================================================================

export interface CoordinatorConfig {
  type: string; // supervisor, round_robin, consensus, custom
  model?: ModelConfig;
  config?: Record<string, any>;
}

export interface SubAgent {
  id: string;
  name: string;
  role: string;
  description?: string;
  tools?: string[]; // tool IDs
  model?: ModelConfig;
  config?: Record<string, any>;
}

export interface AgentTransition {
  from: string; // agent ID or 'start'
  to: string;   // agent ID or 'end'
  condition?: string;
}

export interface MultiAgentConfig {
  coordinator: CoordinatorConfig;
  agents: SubAgent[];
  flow?: {
    start: string;
    transitions: AgentTransition[];
  };
}

// ============================================================================
// Integration Configuration
// ============================================================================

export interface IntegrationTrigger {
  id?: string;
  type: string; // webhook, schedule, manual, event
  config: Record<string, any>; // path, cron, etc.
}

export interface IntegrationNode {
  id: string;
  type: string; // http_request, transformer, database, email, etc.
  label?: string;
  config: Record<string, any>;
  position?: { x: number; y: number };
}

export interface IntegrationConfig {
  triggers: IntegrationTrigger[];
  nodes: IntegrationNode[];
  flow: string; // visual flow representation or execution order
}

// ============================================================================
// Main Agent Configuration
// ============================================================================

export interface AgentConfiguration {
  // Meta information
  id?: string;
  name: string;
  type: AgentType;
  version: string;
  description?: string;
  
  // Model configuration
  model: ModelConfig;
  
  // Tools
  tools?: Tool[];
  
  // Vector Database (optional)
  vectorDatabase?: VectorDatabaseConfig;
  
  // Prompts
  prompts: PromptConfig;
  
  // Memory configuration
  memory?: MemoryConfig;
  
  // Connections to other agents
  connections?: AgentConnection[];
  
  // Environment variables
  env?: Record<string, string>;
  
  // Security settings
  security?: SecurityConfig;
  
  // Type-specific configurations
  workflow?: WorkflowConfig;
  graph?: GraphConfig;
  multiAgent?: MultiAgentConfig;
  integration?: IntegrationConfig;
  
  // Additional metadata
  metadata?: Record<string, any>;
}

// ============================================================================
// Agent Templates
// ============================================================================

export interface AgentTemplate {
  id?: number;
  name: string;
  description: string;
  type: AgentType;
  category: string;
  icon: string;
  config: AgentConfiguration;
  tags?: string[];
  isPublic?: boolean;
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;
  creator?: any;
}

// ============================================================================
// Agent Workflow
// ============================================================================

export interface AgentWorkflow {
  id?: number;
  agentId: number;
  name: string;
  description: string;
  definition: WorkflowConfig;
  status: WorkflowStatus;
  createdAt?: string;
  updatedAt?: string;
  agent?: any;
}

// ============================================================================
// Agent Graph
// ============================================================================

export interface AgentGraph {
  id?: number;
  agentId: number;
  name: string;
  description: string;
  stateSchema: GraphStateSchema;
  nodes: GraphNode[];
  edges: GraphEdge[];
  checkpointer: string;
  status: WorkflowStatus;
  createdAt?: string;
  updatedAt?: string;
  agent?: any;
}

// ============================================================================
// Agent Tools
// ============================================================================

export interface AgentTool {
  id?: number;
  name: string;
  displayName: string;
  description: string;
  category: string;
  config?: Record<string, any>;
  parameters?: Record<string, any>;
  isPublic?: boolean;
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;
  creator?: any;
}

export interface AgentToolUsage {
  id?: number;
  agentId: number;
  toolId: number;
  config?: Record<string, any>;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
  agent?: any;
  tool?: AgentTool;
}

// ============================================================================
// Agent Execution Logs
// ============================================================================

export interface AgentExecutionLog {
  id?: number;
  agentId: number;
  agentInstanceId: number;
  businessId: number;
  locationId: number;
  executionId: string;
  input?: Record<string, any>;
  output?: Record<string, any>;
  state?: Record<string, any>;
  status: string; // success, error, timeout
  errorMessage?: string;
  durationMs: number;
  tokensUsed: number;
  cost: number;
  metadata?: Record<string, any>;
  createdAt?: string;
}

// ============================================================================
// Helper Types
// ============================================================================

export interface CreateAgentFromTemplateRequest {
  templateId: number;
  overrides?: Partial<AgentConfiguration>;
}

export interface ValidateConfigurationRequest {
  config: AgentConfiguration;
}

export interface ValidateConfigurationResponse {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

// ============================================================================
// Predefined Templates Data
// ============================================================================

export const AGENT_CATEGORIES = [
  'Support',
  'Sales',
  'Marketing',
  'Operations',
  'Analytics',
  'Custom'
] as const;

export const TOOL_CATEGORIES = [
  'Search',
  'Transform',
  'API',
  'Database',
  'Communication',
  'Analysis',
  'Custom'
] as const;

export type AgentCategory = typeof AGENT_CATEGORIES[number];
export type ToolCategory = typeof TOOL_CATEGORIES[number];

// ============================================================================
// Visual Editor Types
// ============================================================================

export interface NodePosition {
  x: number;
  y: number;
}

export interface VisualNode {
  id: string;
  type: string;
  label: string;
  position: NodePosition;
  data: Record<string, any>;
}

export interface VisualEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'default' | 'conditional' | 'loop';
}

export interface VisualGraph {
  nodes: VisualNode[];
  edges: VisualEdge[];
}



