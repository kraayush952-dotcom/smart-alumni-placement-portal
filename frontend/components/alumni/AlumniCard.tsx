import Link from "next/link";
import {
  Building2,
  BriefcaseBusiness,
  MapPin,
  ExternalLink,
  Star,
} from "lucide-react";

import { Alumni } from "@/types/alumni";

interface AlumniCardProps {
  alumni: Alumni;
}

export default function AlumniCard({
  alumni,
}: AlumniCardProps) {
  return (
    <div className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary transition-all duration-300 group-hover:scale-105">
            {alumni.name.charAt(0)}
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {alumni.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {alumni.role}
            </p>
          </div>
        </div>

        {alumni.featured && (
          <span className="flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-6 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          {alumni.company}
        </div>

        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4" />
          {alumni.experience}
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {alumni.location}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {alumni.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <a
          href={alumni.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border p-2 transition hover:bg-muted"
        >
          <ExternalLink className="h-5 w-5 text-primary" />
        </a>

        <Link
          href={`/student/alumni/${alumni.id}`}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}