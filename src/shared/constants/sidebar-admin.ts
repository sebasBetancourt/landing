// sidebar-admin.ts
import {
  Archive,
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  Handshake,
  List,
  MessageCircle,
  Plus,
  Shield,
  Users,
  UserPlus,
  Zap,
} from "lucide-react";

export const adminSidebars = {
  management: {
    barNav: [
      {
        name: "Dashboard",
        url: "/admin/dashboard",
        icon: BarChart3,
        items: [],
      },
      {
        name: "Businesses",
        url: "/admin/businesses",
        icon: Building2,
        items: [ // Sub-opciones for Businesses
          {
            name: "All Businesses",
            url: "/admin/businesses",
            icon: List,
          },
          {
            name: "Create Business",
            url: "/admin/businesses/create",
            icon: Plus,
          },
          {
            name: "Archived",
            url: "/admin/businesses/archived",
            icon: Archive,
          }
        ]
      },
      {
        name: "Users",
        url: "/admin/users",
        icon: Users,
        items: [ // Sub-opciones for Users
          {
            name: "All Users",
            url: "/admin/users",
            icon: List,
          },
          {
            name: "Create User",
            url: "/admin/users/create",
            icon: Plus,
          },
          {
            name: "Admins",
            url: "/admin/users/admins",
            icon: Shield,
          },
          {
            name: "Moderators",
            url: "/admin/users/moderators",
            icon: Users,
          }
        ]
      },
      {
        name: "Agents",
        url: "/admin/agents",
        icon: Bot,
        items: []
      },
      {
        name: "Communication Channels",
        url: "/admin/channels",
        icon: MessageCircle,
        items: []
      },
      {
        name: "Onboarding",
        url: "/admin/onboarding",
        icon: ClipboardList,
        items: [
          {
            name: "Form",
            url: "/admin/onboarding/form",
            icon: List,
          },
          {
            name: "Submissions",
            url: "/admin/onboarding/submissions",
            icon: List,
          }
        ]
      },
      {
        name: "Affiliates",
        url: "/admin/affiliates",
        icon: Handshake,
        items: [
          {
            name: "All Affiliates",
            url: "/admin/affiliates",
            icon: List,
          },
          {
            name: "Create Affiliate",
            url: "/admin/users/new?role=affiliate",
            icon: Plus,
          },
          {
            name: "Referrals",
            url: "/admin/affiliates/referrals",
            icon: UserPlus,
          },
          {
            name: "Commissions",
            url: "/admin/affiliates/commissions",
            icon: BarChart3,
          },
          {
            name: "Payouts",
            url: "/admin/affiliates/payouts",
            icon: Handshake,
          }
        ]
      },
      {
        name: "Products",
        url: "/admin/products",
        icon: ClipboardList
      },
      {
        name: "GoHighLevel",
        url: "/admin/gohighlevel",
        icon: Zap,
        items: []
      }
      // {
      //   name: "Developers",
      //   url: "/admin/developers",
      //   icon: Code2,
      //   items: [ // Sub-opciones for Developers
      //     {
      //       name: "All Developers",
      //       url: "/admin/developers",
      //       icon: List,
      //     },
      //     {
      //       name: "Create Developer",
      //       url: "/admin/developers/create",
      //       icon: Plus,
      //     },
      //     {
      //       name: "API Keys",
      //       url: "/admin/developers/api-keys",
      //       icon: Code2,
      //     },
      //     {
      //       name: "Documentation",
      //       url: "/admin/developers/docs",
      //       icon: Archive,
      //     }
      //   ]
      // },
    ],
    dropNav: []
  },
  // security: {
  //   barNav: [
  //     {
  //       name: "Security Dashboard",
  //       url: "/admin/security",
  //       icon: Shield,
  //     },
  //     {
  //       name: "User Permissions",
  //       url: "/admin/permissions",
  //       icon: Users,
  //       items: [
  //         {
  //           name: "All Permissions",
  //           url: "/admin/permissions",
  //           icon: List,
  //         },
  //         {
  //           name: "Role Management",
  //           url: "/admin/permissions/roles",
  //           icon: Shield,
  //         },
  //         {
  //           name: "Access Logs",
  //           url: "/admin/permissions/access-logs",
  //           icon: Archive,
  //         }
  //       ]
  //     },
  //     {
  //       name: "Audit Logs",
  //       url: "/admin/audit",
  //       icon: BarChart3,
  //       items: [
  //         {
  //           name: "All Logs",
  //           url: "/admin/audit",
  //           icon: List,
  //         },
  //         {
  //           name: "Security Events",
  //           url: "/admin/audit/security",
  //           icon: Shield,
  //         },
  //         {
  //           name: "User Activities",
  //           url: "/admin/audit/activities",
  //           icon: Users,
  //         }
  //       ]
  //     },
  //     {
  //       name: "Security Settings",
  //       url: "/admin/security/settings",
  //       icon: Settings,
  //       items: [
  //         {
  //           name: "General Security",
  //           url: "/admin/security/settings",
  //           icon: Settings,
  //         },
  //         {
  //           name: "Two-Factor Auth",
  //           url: "/admin/security/2fa",
  //           icon: Shield,
  //         },
  //         {
  //           name: "IP Whitelist",
  //           url: "/admin/security/ip-whitelist",
  //           icon: List,
  //         }
  //       ]
  //     },
  //   ],
  //   dropNav: []
  // },
  // settings: {
  //   barNav: [
  //     {
  //       name: "System Settings",
  //       url: "/admin/settings",
  //       icon: Settings,
  //       items: [
  //         {
  //           name: "General Settings",
  //           url: "/admin/settings",
  //           icon: Settings,
  //         },
  //         {
  //           name: "Appearance",
  //           url: "/admin/settings/appearance",
  //           icon: BarChart3,
  //         },
  //         {
  //           name: "Notifications",
  //           url: "/admin/settings/notifications",
  //           icon: Users,
  //         },
  //         {
  //           name: "Backup & Restore",
  //           url: "/admin/settings/backup",
  //           icon: Archive,
  //         }
  //       ]
  //     },
  //     {
  //       name: "API Configuration",
  //       url: "/admin/api-config",
  //       icon: Code2,
  //       items: [
  //         {
  //           name: "API Settings",
  //           url: "/admin/api-config",
  //           icon: Code2,
  //         },
  //         {
  //           name: "Endpoints",
  //           url: "/admin/api-config/endpoints",
  //           icon: List,
  //         },
  //         {
  //           name: "Rate Limits",
  //           url: "/admin/api-config/rate-limits",
  //           icon: BarChart3,
  //         },
  //         {
  //           name: "Webhooks",
  //           url: "/admin/api-config/webhooks",
  //           icon: Handshake,
  //         }
  //       ]
  //     },
  //     {
  //       name: "Email Settings",
  //       url: "/admin/email-settings",
  //       icon: Archive,
  //       items: [
  //         {
  //           name: "SMTP Configuration",
  //           url: "/admin/email-settings",
  //           icon: Settings,
  //         },
  //         {
  //           name: "Templates",
  //           url: "/admin/email-settings/templates",
  //           icon: Archive,
  //         },
  //         {
  //           name: "Test Email",
  //           url: "/admin/email-settings/test",
  //           icon: Plus,
  //         }
  //       ]
  //     },
  //   ],
  //   dropNav: []
  // }
};

export const adminHeaderNav = [
  {
    title: "Management",
    href: "/admin/example",
    section: "management"
  },
  // {
  //   title: "Security", 
  //   href: "/admin/example",
  //   section: "security"
  // },
  // {
  //   title: "Settings",
  //   href: "/admin/example",
  //   section: "settings"
  // }
];