import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  GraduationCap,
  UserRound,
} from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const actions: QuickAction[] = [
  {
    title: "Apply Jobs",
    description: "Explore latest opportunities",
    icon: Briefcase,
    href: "/student/jobs",
  },
  {
    title: "Upload Resume",
    description: "Keep your resume updated",
    icon: FileText,
    href: "/student/resume",
  },
  {
    title: "Find Mentor",
    description: "Connect with alumni mentors",
    icon: GraduationCap,
    href: "/student/mentorship",
  },
  {
    title: "Complete Profile",
    description: "Increase profile visibility",
    icon: UserRound,
    href: "/student/profile",
  },
];

export default function QuickActionsCard() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Quick Actions
        </h2>

        <p className="text-sm text-muted-foreground">
          Frequently used shortcuts
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex w-full items-center justify-between rounded-xl border border-border p-4 transition-all hover:bg-muted/50 hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div className="text-left">
                  <p className="font-medium">
                    {action.title}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}