import { type IntegrationCategory, type IntegrationConfig } from '@/shared/types/integrations.types';

/**
 * Integration categories for organizing services
 */
export const INTEGRATION_CATEGORIES = {
  COMMUNICATIONS: 'communications',
  PRODUCTIVITY: 'productivity',
  ERP: 'erp',
} as const;

/**
 * Centralized configuration for all integrations
 * Organized by category with universal fields applicable across the system
 */
export const INTEGRATIONS_CONFIG: IntegrationConfig[] = [
  // ========== COMMUNICATIONS ==========
  {
    type: 'gmail',
    name: 'Gmail',
    description: 'Manage business emails',
    category: INTEGRATION_CATEGORIES.COMMUNICATIONS,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    bg: 'bg-[#fce8e6] dark:bg-transparent',
    ring: 'ring-[#EA4335] dark:ring-white/10',
    href: '/owner/integrations/gmail',
    successLink: '/owner/gmail-inbox',
    provider: 'Google',
    capabilities: ['email', 'inbox', 'send'],
  },
  {
    type: 'telegram',
    name: 'Telegram',
    description: 'Send messages via Telegram Bot',
    category: INTEGRATION_CATEGORIES.COMMUNICATIONS,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    bg: 'bg-[#e7f3ff] dark:bg-transparent',
    ring: 'ring-[#26A5E4] dark:ring-white/10',
    href: '/owner/integrations/telegram',
    successLink: '/owner/telegram',
    provider: 'Telegram',
    capabilities: ['messaging', 'bot', 'notifications'],
  },
  {
    type: 'twilio',
    name: 'Twilio',
    description: 'Make calls and send SMS',
    category: INTEGRATION_CATEGORIES.COMMUNICATIONS,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg',
    bg: 'bg-[#fff0f0] dark:bg-transparent',
    ring: 'ring-[#F22F46] dark:ring-white/10',
    href: '/owner/integrations/twilio',
    successLink: '/owner/twilio',
    provider: 'Twilio',
    capabilities: ['sms', 'voice', 'calls'],
  },
  {
    type: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Chat with your customers via WhatsApp',
    category: INTEGRATION_CATEGORIES.COMMUNICATIONS,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    bg: 'bg-[#e7f7ef] dark:bg-transparent',
    ring: 'ring-[#25D366] dark:ring-white/10',
    href: '/owner/integrations/whatsapp',
    successLink: '/owner/whatsapp/chat',
    provider: 'Meta',
    capabilities: ['messaging', 'chat', 'notifications', 'whatsapp', 'business-api'],
  },
  // Facebook (commented out)
  // {
  //   type: 'facebook',
  //   name: 'Facebook',
  //   description: 'Connect your page',
  //   category: INTEGRATION_CATEGORIES.COMMUNICATIONS,
  //   logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
  //   bg: 'bg-[#e7f0ff] dark:bg-transparent',
  //   ring: 'ring-[#1877F2] dark:ring-white/10',
  //   href: '/owner/integrations/facebook',
  //   successLink: '/owner/whatsapp/chat',
  //   provider: 'Meta',
  //   capabilities: ['social', 'messaging', 'posts'],
  // },
  // Instagram (commented out)
  // {
  //   type: 'instagram',
  //   name: 'Instagram',
  //   description: 'Manage your profile',
  //   category: INTEGRATION_CATEGORIES.COMMUNICATIONS,
  //   logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
  //   bg: 'bg-[#fbe7ff] dark:bg-transparent',
  //   ring: 'ring-[#E1306C] dark:ring-white/10',
  //   href: '/owner/integrations/instagram',
  //   successLink: '/owner/whatsapp/chat',
  //   provider: 'Meta',
  //   capabilities: ['social', 'messaging', 'media'],
  // },

  // ========== PRODUCTIVITY TOOLS ==========
  {
    type: 'google_calendar',
    name: 'Google Calendar',
    description: 'Sync events and schedules',
    category: INTEGRATION_CATEGORIES.PRODUCTIVITY,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
    bg: 'bg-[#e8f0fe] dark:bg-transparent',
    ring: 'ring-[#1a73e8] dark:ring-white/10',
    href: '/owner/integrations/google-calendar',
    successLink: '/owner/calendar',
    provider: 'Google',
    capabilities: ['calendar', 'events', 'scheduling'],
  },

  // ========== ERP / BUSINESS SYSTEMS ==========
  {
    type: 'presik',
    name: 'Presik Hotel',
    description: 'Gestión de consumidores y reservas hoteleras',
    category: INTEGRATION_CATEGORIES.ERP,
    logo: '🏨',
    bg: 'bg-[#f0f7ff] dark:bg-transparent',
    ring: 'ring-[#2563eb] dark:ring-white/10',
    href: '/owner/integrations/presik',
    successLink: '/owner/presik',
    provider: 'Presik',
    capabilities: ['hotel', 'reservations', 'consumers', 'rate-plans'],
  },
  {
    type: 'sinco_cbr',
    name: 'SINCO CBR',
    description: 'Manage real estate clients and properties',
    category: INTEGRATION_CATEGORIES.PRODUCTIVITY,
    logo: '🏢',
    bg: 'bg-[#f0f9ff] dark:bg-transparent',
    ring: 'ring-[#0ea5e9] dark:ring-white/10',
    href: '/owner/integrations/sinco-cbr',
    successLink: '/owner/sinco-cbr',
    provider: 'SINCO',
    capabilities: ['erp', 'real-estate', 'clients', 'properties', 'crm'],
  },
];

/**
 * Categories configuration with metadata
 */
export const CATEGORIES_CONFIG: IntegrationCategory[] = [
  {
    id: INTEGRATION_CATEGORIES.COMMUNICATIONS,
    name: 'Communications',
    description: 'Connect with customers through multiple channels',
    icon: 'MessageSquare',
  },
  {
    id: INTEGRATION_CATEGORIES.PRODUCTIVITY,
    name: 'Productivity Tools',
    description: 'Streamline your workflow and scheduling',
    icon: 'Calendar',
  },
  {
    id: INTEGRATION_CATEGORIES.ERP,
    name: 'ERP Systems',
    description: 'Enterprise resource planning and business management',
    icon: 'Building',
  },
];

/**
 * Get integration configuration by type
 */
export const getIntegrationConfig = (type: string): IntegrationConfig | undefined => {
  return INTEGRATIONS_CONFIG.find((integration) => integration.type === type);
};

/**
 * Get all enabled integrations (future use for filtering)
 */
export const getEnabledIntegrations = (): IntegrationConfig[] => {
  return INTEGRATIONS_CONFIG;
};

/**
 * Get integrations by category
 */
export const getIntegrationsByCategory = (category: string): IntegrationConfig[] => {
  return INTEGRATIONS_CONFIG.filter((integration) => integration.category === category);
};

/**
 * Get all categories with their integrations
 */
export const getIntegrationsGroupedByCategory = () => {
  return CATEGORIES_CONFIG.map((category) => ({
    ...category,
    integrations: getIntegrationsByCategory(category.id),
  }));
};

