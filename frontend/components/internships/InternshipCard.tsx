import Link from "next/link";
import { Building2, Clock3, IndianRupee, MapPin } from "lucide-react";
import { Internship } from "@/types/internship";

interface InternshipCardProps {
  internship: Internship;
}

const modeStyles = {
  Remote: "bg-green-100 text-green-700",
  Hybrid: "bg-blue-100 text-blue-700",
  Onsite: "bg-orange-100 text-orange-700",
};

export default function InternshipCard({
  internship,
}: InternshipCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{internship.title}</h2>
          <p className="mt-1 flex items-center gap-2 text-gray-600">
            <Building2 className="h-4 w-4" />
            {internship.company}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            modeStyles[internship.mode]
          }`}
        >
          {internship.mode}
        </span>
      </div>

      <div className="mt-6 space-y-3 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {internship.location}
        </p>

        <p className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          {internship.duration}
        </p>

        <p className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4" />
          {internship.stipend}
        </p>
      </div>

      <div className="mt-6 border-t pt-4">
        <Link
          href={`/student/internships/${internship.id}`}
          className="font-medium text-primary hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}