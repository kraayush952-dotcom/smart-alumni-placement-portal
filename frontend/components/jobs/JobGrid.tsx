import JobCard from "./JobCard";
import { Job } from "@/types/job";

interface JobGridProps {
  jobs: Job[];
}

export default function JobGrid({ jobs }: JobGridProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}