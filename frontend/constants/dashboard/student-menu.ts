import type { SidebarMenuGroup } from "@/types/dashboard";

export const studentMenu: SidebarMenuGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/student/dashboard",
        icon: "LayoutDashboard",
      },
      {
        title: "Jobs",
        href: "/student/jobs",
        icon: "Briefcase",
      },
      {
        title: "Internships",
        href: "/student/internships",
        icon: "GraduationCap",
      },
      {
        title: "Mentorship",
        href: "/student/mentorship",
        icon: "Handshake",
      },
      {
        title: "Alumni",
        href: "/student/alumni",
        icon: "Users",
      },
      {
        title: "My Applications",
        href: "/student/applications",
        icon: "FileText",
      },
      {
        title: "Profile",
        href: "/student/profile",
        icon: "User",
      },
      {
        title: "Resume",
        href: "/student/resume",
        icon: "FileText",
      },
      {
        title: "Settings",
        href: "/student/settings",
        icon: "Settings",
      },
    ],
  },
];