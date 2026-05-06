export interface BusinessLandingLink {
  id?: number;
  businessLandingId?: number;
  title: string;
  url: string;
  icon?: string;
  sortOrder?: number;
  openInNewTab?: boolean;
}

export interface BusinessLanding {
  id?: number;
  businessId?: number;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  buttonTextColor?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  logoUrl?: string;
  bannerUrl?: string;
  layout?: string;
  buttonStyle?: string;
  showAgents?: boolean;
  showSocial?: boolean;
  /** Agent instance ID used for visitor chat (optional; if not set, first agent is used). */
  defaultAgentInstanceId?: number | null;
  /** Chat header bar colors (optional; fall back to main landing colors when not set). */
  headerBackgroundColor?: string;
  headerTextColor?: string;
  headerAccentColor?: string;
  headerBorderColor?: string;
  /** Controls visibility of the chat header call button. */
  showCallButton?: boolean;
  /** Phone number used by the chat header call button (click-to-call). */
  callPhone?: string;
  /** Chat messages area background: "color" (solid) or "image". Default "color". */
  chatBackgroundType?: "color" | "image";
  /** When chatBackgroundType is "image", URL of the uploaded background image. */
  chatBackgroundImageUrl?: string;
  /** Chat theme (WhatsApp-style: sent bubble, received bubble, input). */
  chatBackground?: string;
  chatSentBubbleBg?: string;
  chatSentBubbleText?: string;
  chatReceivedBubbleBg?: string;
  chatReceivedBubbleText?: string;
  chatInputBg?: string;
  chatInputFieldBg?: string;
  chatInputText?: string;
  chatInputPlaceholder?: string;
  chatSendButtonBg?: string;
  chatSendButtonIcon?: string;
  customCss?: string;
  links?: BusinessLandingLink[];
}
