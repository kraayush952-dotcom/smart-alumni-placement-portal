export type UserRole = "Student" | "Alumni" | "Admin";

export type IconName =
  | "LayoutDashboard"
  | "Briefcase"
  | "GraduationCap"
  | "Handshake"
  | "Users"
  | "FileText"
  | "User"
  | "Settings";

export interface SidebarMenuItem {
  title: string;
  href: string;
  icon: IconName;
}

export interface SidebarMenuGroup {
  title?: string;
  items: SidebarMenuItem[];
}