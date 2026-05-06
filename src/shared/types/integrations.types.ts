export interface Integration {
  id: number;
  userId?: number;
  businessId?: number;
  type: IntegrationType;
  name: string;
  category?: string;
  description?: string;
  homePage?: string;
  version?: string;
  config?: any;
  flags?: string[];
  enabled: boolean;
  count?: number;
  hasUI?: boolean;
  hasConfig?: boolean;
  hasWebhook?: boolean;
  dependencies?: string[];
  icon?: string;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IntegrationInstance {
  id: number;
  integrationId: number;
  agentInstanceId: number;

  version: string;
  name: string;

  config: any;
  apiKey?: string;
  dataKey?: string;

  webhookUrl?: string;
  webhookSecret?: string;

  status: "connected" | "disconnected" | "error" | "pending";
  lastSyncAt?: string;
  lastError?: string;

  enabled: boolean;

  createdAt?: string;
  updatedAt?: string;

  integration?: Integration;
  agentInstance?: any;
  data?: any;
}

export interface BusinessIntegration {
  id: number;
  businessId: number;
  integrationId: number;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  business?: any;
  integration?: Integration;
}

export interface AgentIntegration {
  id: number;
  agentId: number;
  integrationId: number;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  agent?: any;
  integration?: Integration;
}

export type IntegrationType =
  | "google_calendar"
  | "whatsapp"
  | "gmail"
  | "facebook"
  | "instagram"
  | "telegram"
  | "twilio"
  | "sinco_cbr"
  | "presik";

export interface ConnectIntegrationResponse {
  success: boolean;
  auth_url?: string;
  state?: string;
  message?: string;
}

export interface DisconnectIntegrationResponse {
  success: boolean;
  message?: string;
}

export interface TestConnectionResponse {
  success: boolean;
  message?: string;
}

export interface IntegrationMetadata {
  type: IntegrationType;
  name: string;
  description: string;
  icon: string;
  status: "connected" | "disconnected" | "error";
}

export interface IntegrationConfig {
  type: IntegrationType;
  name: string;
  description: string;
  category: string;
  logo: string;
  bg: string;
  ring: string;
  href: string;
  /** Link to the integration's working app page when connected */
  successLink?: string;
  /** Provider/company name */
  provider?: string;
  /** Capabilities this integration provides */
  capabilities?: string[];
  /** Optional tags for filtering */
  tags?: string[];
  /** Whether this integration requires OAuth */
  requiresOAuth?: boolean;
  /** Whether this integration has webhooks */
  hasWebhooks?: boolean;
}

export interface IntegrationCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}
