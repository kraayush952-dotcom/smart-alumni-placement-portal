import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {job.title}
          </h3>

          <p className="mt-1 text-muted-foreground">
            {job.company}
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {job.match}% Match
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
        <span>💰 {job.salary}</span>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="rounded-lg border px-4 py-2 hover:bg-muted transition">
          Save
        </button>

        <button className="rounded-lg bg-primary px-4 py-2 text-white hover:opacity-90 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
}