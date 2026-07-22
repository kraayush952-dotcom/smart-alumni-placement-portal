import { ArrowRight, UserCheck } from "lucide-react";

interface ProfileCompletionCardProps {
  progress: number;
}

export default function ProfileCompletionCard({
  progress,
}: ProfileCompletionCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <UserCheck className="h-6 w-6 text-primary" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Profile Completion
          </h3>

          <p className="text-sm text-muted-foreground">
            Increase your profile visibility
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Completion
          </span>

          <span className="text-sm font-bold text-primary">
            {progress}%
          </span>
        </div>

        <div className="h-3 w-full rounded-full bg-muted">
          <div
            className="h-3 rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Complete your profile to improve your chances of getting noticed by recruiters.
      </p>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90">
        Complete Profile
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}