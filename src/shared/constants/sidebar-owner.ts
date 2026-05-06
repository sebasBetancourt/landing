import {
    BarChart3,
    Calendar,
    ExternalLink,
    LayoutDashboard,
    Library,
    Link,
    MessageCircle,
    MessageSquare,
    MessageSquareText,
    ShoppingBag,
    Users,
    Wallet,
} from "lucide-react"


export const sideBarNav = {
    barNav: [
    {
        name: "Dashboard",
        url: "/owner/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Payments",
        url: "/owner/payment",
        icon: Wallet,
    },
    {
        name: "Team",
        url: "/owner/team",
        icon: Users,
    },
    ...(process.env.NODE_ENV === 'development'
        ? [{
            name: "Store",
            url: "/owner/store",
            icon: ShoppingBag,
        }]
        : []),
    {
        name: "Public page",
        url: "/owner/public-page",
        icon: Link,
    },
    {
        name: "Communications",
        url: "/owner/agent-talk/channel",
        icon: MessageSquareText,
    },
    {
        name: "WhatsApp",
        url: "/owner/whatsapp",
        icon: MessageCircle,
    },
    {
        name: "Metrics",
        url: "/owner/metrics",
        icon: BarChart3,
    },
    {
        name: "Knowledge base",
        url: "/owner/knowledge",
        icon: Library,
    },
        {
        name: "Calendars",
        url: "/owner/calendar",
        icon: Calendar,
    },
    {
      name: "Agent Chat",
      url: "/owner/agent-talk",
      icon: MessageSquare,
      /** Avoid highlighting when user is on /owner/agent-talk/channel/:id (Communications). */
      matchExact: true,
    },
    {
      name: "CRM",
      url: "https://crm.adeptos.io",
      icon: ExternalLink,
    },
    ],
}
