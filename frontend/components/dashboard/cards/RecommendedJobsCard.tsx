import { ArrowRight, Bookmark, MapPin } from "lucide-react";

interface Job {
  id: number;
  company: string;
  role: string;
  location: string;
  salary: string;
  match: number;
}

interface RecommendedJobsCardProps {
  jobs: Job[];
}

export default function RecommendedJobsCard({
  jobs,
}: RecommendedJobsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recommended Jobs
          </h2>

          <p className="text-sm text-muted-foreground">
            Based on your profile
          </p>
        </div>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-muted/40"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                  {job.company.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {job.company}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {job.role}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {job.match}% Match
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>

              <span>{job.salary}</span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button className="rounded-xl border border-border p-2 hover:bg-muted">
                <Bookmark className="h-4 w-4" />
              </button>

              <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}