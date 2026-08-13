import Link from "next/link";
import { ArrowRight, UserCheck } from "lucide-react";

interface ProfileCompletionCardProps {
  progress: number;
}

export default function ProfileCompletionCard({
  progress,
}: ProfileCompletionCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
          <UserCheck className="h-7 w-7 text-primary" />
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            Profile Completion
          </h3>

          <p className="text-sm text-muted-foreground">
            Increase your profile visibility
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Completion
          </span>

          <span className="text-base font-bold text-primary">
            {progress}%
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-6 text-sm leading-6 text-muted-foreground">
        Complete your profile to improve your chances of getting noticed by recruiters.
      </p>

      <Link
        href="/student/profile"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        Complete Profile
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}