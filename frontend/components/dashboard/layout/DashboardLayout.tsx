import { ReactNode } from "react";

import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

import type { SidebarMenuGroup } from "@/types/dashboard";

interface DashboardLayoutProps {
  menu: SidebarMenuGroup[];
  children: ReactNode;
}

export default function DashboardLayout({
  menu,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar menu={menu} />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}