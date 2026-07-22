"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Handshake,
  Users,
  FileText,
  User,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { SidebarMenuItem } from "@/types/dashboard";

interface SidebarItemProps {
  item: SidebarMenuItem;
}

const icons = {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Handshake,
  Users,
  FileText,
  User,
  Settings,
};

export default function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  const Icon = icons[item.icon];

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{item.title}</span>
    </Link>
  );
}