import Link from "next/link";
import {
  Building2,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import { Application } from "@/types/application";

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({
  application,
}: ApplicationCardProps) {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shortlisted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {application.company}
            </h3>

            <p className="text-lg font-bold text-gray-800">
              {application.jobTitle}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}
        >
          {application.status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{application.location}</span>
        </div>

        <div className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span>Applied: {application.appliedAt}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <Link
          href={`/student/applications/${application.id}`}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition hover:opacity-90"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}