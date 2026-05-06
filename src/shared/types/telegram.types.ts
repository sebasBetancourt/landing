// Telegram Bot API Types - mirrors backend types for consistency

export interface TelegramUser {
  id: number;
  isBot: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  canJoinGroups?: boolean;
  canReadAllGroupMessages?: boolean;
  supportsInlineQueries?: boolean;
}

export interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  description?: string;
}

export interface TelegramMessage {
  messageId: number;
  from?: TelegramUser;
  senderChat?: TelegramChat;
  date: number;
  chat: TelegramChat;
  forwardFrom?: TelegramUser;
  forwardFromChat?: TelegramChat;
  forwardFromMessageId?: number;
  forwardDate?: number;
  replyToMessage?: TelegramMessage;
  viaBot?: TelegramUser;
  editDate?: number;
  text?: string;
  entities?: MessageEntity[];
  captionEntities?: MessageEntity[];
  audio?: Audio;
  document?: Document;
  photo?: PhotoSize[];
  sticker?: Sticker;
  video?: Video;
  voice?: Voice;
  caption?: string;
  contact?: Contact;
  location?: Location;
  newChatMembers?: TelegramUser[];
  leftChatMember?: TelegramUser;
  newChatTitle?: string;
  newChatPhoto?: PhotoSize[];
  deleteChatPhoto?: boolean;
  groupChatCreated?: boolean;
  supergroupChatCreated?: boolean;
  channelChatCreated?: boolean;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface MessageEntity {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: TelegramUser;
}

export interface PhotoSize {
  fileId: string;
  fileUniqueId: string;
  width: number;
  height: number;
  fileSize?: number;
}

export interface Audio {
  fileId: string;
  fileUniqueId: string;
  duration: number;
  performer?: string;
  title?: string;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export interface Document {
  fileId: string;
  fileUniqueId: string;
  thumb?: PhotoSize;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export interface Video {
  fileId: string;
  fileUniqueId: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export interface Voice {
  fileId: string;
  fileUniqueId: string;
  duration: number;
  mimeType?: string;
  fileSize?: number;
}

export interface Sticker {
  fileId: string;
  fileUniqueId: string;
  width: number;
  height: number;
  isAnimated: boolean;
  isVideo: boolean;
  thumb?: PhotoSize;
  emoji?: string;
  setName?: string;
  fileSize?: number;
}

export interface Contact {
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  userId?: number;
  vCard?: string;
}

export interface Location {
  longitude: number;
  latitude: number;
  horizontalAccuracy?: number;
  livePeriod?: number;
  heading?: number;
  proximityAlertRadius?: number;
}

export interface InlineKeyboardMarkup {
  inlineKeyboard: InlineKeyboardButton[][];
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callbackData?: string;
  switchInlineQuery?: string;
  switchInlineQueryCurrentChat?: string;
}

export interface Update {
  updateId: number;
  message?: TelegramMessage;
  editedMessage?: TelegramMessage;
  channelPost?: TelegramMessage;
  editedChannelPost?: TelegramMessage;
  callbackQuery?: CallbackQuery;
  inlineQuery?: InlineQuery;
  chosenInlineResult?: ChosenInlineResult;
}

export interface CallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  inlineMessageId?: string;
  chatInstance: string;
  data?: string;
  gameShortName?: string;
}

export interface InlineQuery {
  id: string;
  from: TelegramUser;
  query: string;
  offset: string;
  chatType?: string;
  location?: Location;
}

export interface ChosenInlineResult {
  resultId: string;
  from: TelegramUser;
  location?: Location;
  inlineMessageId?: string;
  query: string;
}

export interface WebhookInfo {
  url: string;
  hasCustomCertificate: boolean;
  pendingUpdateCount: number;
  ipAddress?: string;
  lastErrorDate?: number;
  lastErrorMessage?: string;
  maxConnections?: number;
  allowedUpdates?: string[];
}

// Request/Response types for API calls

export interface SendMessageRequest {
  chatId: number | string;
  text: string;
  parseMode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  entities?: MessageEntity[];
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
  replyToMessageId?: number;
  allowSendingWithoutReply?: boolean;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface SendPhotoRequest {
  chatId: number | string;
  photo: string; // file_id or URL
  caption?: string;
  parseMode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface SendDocumentRequest {
  chatId: number | string;
  document: string; // file_id or URL
  caption?: string;
  parseMode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface TelegramStatus {
  exists: boolean;
  instanceId?: number;
  status?: string;
  hasBotToken?: boolean;
  enabled?: boolean;
  botUsername?: string;
  botName?: string;
  lastSync?: string;
  lastError?: string;
}

export interface TelegramSetupRequest {
  agentInstanceId: number;
  config: {
    botToken: string;
    webhookUrl?: string;
  };
  name?: string;
}

export interface TelegramSetupResponse {
  message: string;
  instance: {
    id: number;
    name: string;
    status: string;
    config: any;
  };
  bot: {
    id: number;
    username: string;
    firstName: string;
    isBot: boolean;
  };
  isNew: boolean;
}

export interface BotInfoResponse {
  bot: {
    id: number;
    username: string;
    firstName: string;
    isBot: boolean;
    canJoinGroups?: boolean;
    canReadAllGroupMessages?: boolean;
    supportsInlineQueries?: boolean;
  };
}

export interface SetBotTokenRequest {
  botToken: string;
}

export interface SetWebhookRequest {
  webhookUrl: string;
  allowedUpdates?: string[];
}

export interface GetUpdatesResponse {
  updates: Update[];
  count: number;
}

export interface SendMessageResponse {
  status: string;
  messageId: number;
  chatId: number;
  date: number;
}

export interface TestConnectionResponse {
  message: string;
  instanceId: string;
  status: string;
  bot: TelegramUser;
}

export interface HealthCheckResponse {
  healthy: boolean;
  issues: string[];
  activeInstances: number;
  totalInstances: number;
  timestamp: string;
}

// Message parse modes
export const TELEGRAM_PARSE_MODES = {
  MARKDOWN: 'Markdown',
  MARKDOWN_V2: 'MarkdownV2',
  HTML: 'HTML',
} as const;

// Chat types
export const TELEGRAM_CHAT_TYPES = {
  PRIVATE: 'private',
  GROUP: 'group',
  SUPERGROUP: 'supergroup',
  CHANNEL: 'channel',
} as const;

// Message types
export const TELEGRAM_MESSAGE_TYPES = {
  TEXT: 'text',
  PHOTO: 'photo',
  VIDEO: 'video',
  DOCUMENT: 'document',
  AUDIO: 'audio',
  VOICE: 'voice',
  LOCATION: 'location',
  CONTACT: 'contact',
  STICKER: 'sticker',
} as const;
