import type { SidebarMenuGroup } from "@/types/dashboard";

export const adminMenu: SidebarMenuGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: "LayoutDashboard",
      },
      {
        title: "Students",
        href: "/admin/students",
        icon: "Users",
      },
      {
        title: "Alumni",
        href: "/admin/alumni",
        icon: "GraduationCap",
      },
      {
        title: "Jobs",
        href: "/admin/jobs",
        icon: "Briefcase",
      },
      {
        title: "Internships",
        href: "/admin/internships",
        icon: "FileText",
      },
      {
        title: "Mentorship",
        href: "/admin/mentorship",
        icon: "Handshake",
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: "Settings",
      },
    ],
  },
];