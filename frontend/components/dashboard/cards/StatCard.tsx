import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            {value}
          </h2>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
          <Icon className="h-7 w-7 text-primary" />
        </div>
      </div>
    </div>
  );
}