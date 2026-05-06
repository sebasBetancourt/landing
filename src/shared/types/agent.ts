/**
 * Agent type definition matching the backend Go model
 * See: api/api/models/agent.go
 */
export interface Agent {
  id?: number;
  userId?: number; // user id that created the agent
  name: string;
  category: string;  // category of the agent, e.g. Business, Health, Finance
  kind: string; // type of agent, e.g. chat, voice, video
  description: string; // short description of the agent to be displayed in the UI
  homePage: string; // home page of the agent giving detailed description and instructions for use
  version?: string; // version of the agent
  vectorDatabaseType?: string; // type of vector database to use (pinecone, weaviate, etc.)
  config?: Record<string, any>; // json encoded config data
  flags?: string[]; // flags can say anything about the agent
  enabled?: boolean;  // is the agent enabled for deployment
  count?: number; // number of businesses using the agent
  hasUI?: boolean; // does the agent have a UI that can be embedded
  hasConfig?: boolean; // does the agent have a config interface
  hasMetrics?: boolean; // does the agent have a metrics interface
  usesIframe?: boolean; // does the agent UI/Config/Metrics need to be in an iframe
  usesHtmx?: boolean; // does the agent use htmx for UI/Config/Metrics
  dependencies?: string[]; // what agent or applications the agent depends on
  installer: string; // what is the recommended way to install the agent
  installScript: string; // URL of the script to install the agent
  createdAt?: string;
  updatedAt?: string;
}

/**
 * CommunicationChannel - Channel type (WhatsApp, Telegram, etc.) for multi-channel chat
 * See: api/api/models/agent.go
 */
export interface CommunicationChannel {
  id?: number;
  identifier: string;   // e.g. "wpp", "telegram"
  displayName: string;
  photoUrl?: string;
  /** If true, agent can send messages from this channel (e.g. reply in chat). When false, read-only. */
  canSendMessages?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Channel enabled for an agent instance with per-instance canSendMessages. */
export interface InstanceChannelItem {
  channel: CommunicationChannel;
  canSendMessages: boolean;
  outboundUrl?: string;
  outboundApiKey?: string;
}

/**
 * BusinessAgents - Linking table between businesses and agents
 * Defines which agents are available to which businesses with subscription control
 * See: api/api/models/agent.go
 */
export interface BusinessAgents {
  id?: number;
  businessId: number;
  agentId: number;
  expiresAt?: string; // subscription expiration date
  createdAt?: string;
  updatedAt?: string;
  business?: any; // Business (optional preload)
  agent?: Agent; // Agent (optional preload)
}

/**
 * AgentInstance - Agent instance deployed for a business at a specific location
 * This is the centralized model that replaces both BusinessAgent and LocationAgent
 * See: api/api/models/agent.go
 */
export interface AgentInstance {
  id?: number;
  agentId: number; // reference to the global Agent
  version?: string; // version of the agent instance
  businessId: number; // business that owns the instance
  locationId: number; // location where the instance is deployed
  name: string; // custom name for this instance
  config?: Record<string, any>; // location-specific configuration (emails, phones, knowledge base, etc.)
  apiKey?: string; // unique API key for this instance
  dataKey?: string; // encryption key for instance data
  hostIp?: string; // IP address of the host running the agent
  domainName?: string; // domain name of the host
  port?: string; // port the agent listens on
  path?: string; // path to the agent UI interface
  baseUrl?: string; // computed base URL for the agent instance (from hostIp/domainName + port + path)
  configUrl?: string; // URL of the config interface
  metricsUrl?: string; // URL of the metrics interface
  status?: string; // status: active, inactive, error
  enabled?: boolean; // is the agent enabled
  createdAt?: string;
  updatedAt?: string;
  agent?: Agent; // populated with Preload (contains vectorDatabaseType)
  location?: any; // Location (populated with Preload)
  data?: AgentInstanceData[]; // populated with Preload
}

/**
 * AgentInstanceData - Encrypted data for an agent instance
 * Stores sensitive configuration like credentials, knowledge base, etc.
 * See: api/api/models/agent.go
 */
export interface AgentInstanceData {
  id?: number;
  businessId: number;
  locationId: number;
  agentInstanceId: number; // reference to the AgentInstance
  name: string; // name of the data (e.g. "email_config", "knowledge_base", "phone_numbers")
  kind: string; // data type (e.g. "credentials", "config", "knowledge")
  data?: Uint8Array | string; // encrypted data
  createdAt?: string;
  updatedAt?: string;
  agentInstance?: AgentInstance; // populated with Preload
}

/**
 * AgentMetric - metrics for agent instances
 * See: api/api/models/agent.go
 */
export interface AgentMetric {
  id?: number;
  timestamp?: string;
  period?: string; // raw, 6h, 12h, 24h, week, month
  host?: string; // hostname the metric is generated on
  hostIp?: string; // ip address the metric is generated on
  businessId: number;
  locationId: number; // location where the agent is deployed
  agentInstanceId: number; // agent instance reference
  name: string; // name of the metric data
  kind: string; // type of metric data: percentage, number, text
  percentage?: number; // percentage value
  number?: number; // number value
  text?: string; // text value (if appropriate)
  createdAt?: string;
  updatedAt?: string;
}

export interface AgentSearchParams {
  name?: string;
  kind?: string;
  enabled?: boolean;
}

export interface AgentHealthOverviewItem {
  businessId: number;
  businessName: string;
  businessEnabled: boolean;
  ownerId: number;
  ownerName: string;
  ownerEmail: string;
  agentInstanceId: number;
  agentId: number;
  agentName: string;
  agentKind: string;
  instanceName: string;
  locationId: number;
  locationName: string;
  enabled: boolean;
  status: string;
  effectiveStatus: string;
  healthUrl: string;
  healthStatus: "healthy" | "unhealthy" | "unreachable" | string;
  healthHttpStatus?: number;
  healthLatencyMs?: number;
  healthError?: string;
  healthPayload?: Record<string, unknown>;
  healthCheckedAt: string;
  updatedAt: string;
}

export interface AgentHealthOverviewSummary {
  total: number;
  healthy: number;
  unhealthy: number;
  unreachable: number;
  disabled: number;
}

export interface AgentHealthOverviewResponse {
  items: AgentHealthOverviewItem[];
  total: number;
  summary: AgentHealthOverviewSummary;
  computed: string;
}

/** One hourly KPI row persisted by the API (UTC). */
export interface AgentHealthHistorySample {
  at: string;
  summary: AgentHealthOverviewSummary;
}

export interface AgentHealthOverviewHistoryResponse {
  samples: AgentHealthHistorySample[];
}
