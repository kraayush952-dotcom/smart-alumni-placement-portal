"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Search className="h-5 w-5" />
        <span className="text-sm">Search...</span>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>

        <button className="flex items-center gap-2">
          <UserCircle2 className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium">
            User
          </span>
        </button>
      </div>
    </header>
  );
}