import { Home, LayoutDashboard, Users, Wallet } from "lucide-react";

export const affiliateSidebar = {
  barNav: [
    { name: "Home",       url: "/affiliate/home",      icon: Home            },
    { name: "Dashboard",  url: "/affiliate/dashboard", icon: LayoutDashboard  },
    { name: "Referrals",  url: "/affiliate/referrals", icon: Users            },
    { name: "Payments",   url: "/affiliate/payments",  icon: Wallet           },
  ],
};
