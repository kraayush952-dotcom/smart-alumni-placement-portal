import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function SidebarLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 border-b px-4 py-5"
    >
      <div className="rounded-lg bg-primary p-2 text-primary-foreground">
        <GraduationCap className="h-5 w-5" />
      </div>

      <div>
        <h2 className="text-sm font-bold">
          Vignan Portal
        </h2>

        <p className="text-xs text-muted-foreground">
          Alumni & Placement
        </p>
      </div>
    </Link>
  );
}