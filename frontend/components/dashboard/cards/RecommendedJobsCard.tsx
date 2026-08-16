import Link from "next/link";
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
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recommended Jobs
          </h2>

          <p className="text-sm text-muted-foreground">
            Based on your profile
          </p>
        </div>

        <Link
          href="/student/jobs"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-muted/30 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-bold text-lg text-primary transition-all duration-300 group-hover:scale-105">
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

              <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
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
              <button className="rounded-xl border border-border p-2 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5">
                <Bookmark className="h-4 w-4" />
              </button>

              <Link
                href={`/student/jobs/${job.id}`}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}