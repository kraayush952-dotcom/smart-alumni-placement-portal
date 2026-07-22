"use client";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import type { SidebarMenuGroup } from "@/types/dashboard";

interface SidebarProps {
  menu: SidebarMenuGroup[];
}

export default function Sidebar({ menu }: SidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      <SidebarLogo />

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {menu.map((group, index) => (
          <div key={index} className="space-y-1">
            {group.title && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
            )}

            {group.items.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
              />
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}