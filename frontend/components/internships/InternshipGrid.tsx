import InternshipCard from "./InternshipCard";
import { Internship } from "@/types/internship";

interface InternshipGridProps {
  internships: Internship[];
}

export default function InternshipGrid({
  internships,
}: InternshipGridProps) {
  if (internships.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold">No Internships Found</h2>
        <p className="mt-2 text-gray-500">
          Please check back later for new internship opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {internships.map((internship) => (
        <InternshipCard
          key={internship.id}
          internship={internship}
        />
      ))}
    </div>
  );
}