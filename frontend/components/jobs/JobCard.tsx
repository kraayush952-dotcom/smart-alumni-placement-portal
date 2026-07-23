import Link from "next/link";
import {
  Building2,
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  Heart,
  Star,
} from "lucide-react";

import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {job.company}
            </h3>

            <p className="text-lg font-bold text-gray-800">
              {job.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {job.match}% Match
          </span>

          {job.featured && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}

          <button className="rounded-full border p-2 transition hover:bg-gray-100">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-1">
          <BriefcaseBusiness className="h-4 w-4" />
          <span>{job.type}</span>
        </div>

        <div className="flex items-center gap-1">
          <IndianRupee className="h-4 w-4" />
          <span>{job.salary}</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock3 className="h-4 w-4" />
          <span>{job.postedAt}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="rounded-lg border px-4 py-2 transition hover:bg-muted">
          Save
        </button>

        <Link
          href={`/student/jobs/${job.id}`}
          className="rounded-lg bg-primary px-4 py-2 text-white transition hover:opacity-90"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}