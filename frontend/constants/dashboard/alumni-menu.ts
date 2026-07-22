import type { SidebarMenuGroup } from "@/types/dashboard";

export const alumniMenu: SidebarMenuGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/alumni/dashboard",
        icon: "LayoutDashboard",
      },
      {
        title: "Manage Jobs",
        href: "/alumni/jobs",
        icon: "Briefcase",
      },
      {
        title: "Manage Internships",
        href: "/alumni/internships",
        icon: "GraduationCap",
      },
      {
        title: "Mentorship",
        href: "/alumni/mentorship",
        icon: "Handshake",
      },
      {
        title: "Profile",
        href: "/alumni/profile",
        icon: "User",
      },
      {
        title: "Settings",
        href: "/alumni/settings",
        icon: "Settings",
      },
    ],
  },
];