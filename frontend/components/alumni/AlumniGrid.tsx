import AlumniCard from "@/components/alumni/AlumniCard";
import { Alumni } from "@/types/alumni";

interface AlumniGridProps {
  alumni: Alumni[];
}

export default function AlumniGrid({
  alumni,
}: AlumniGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {alumni.map((person) => (
        <AlumniCard
          key={person.id}
          alumni={person}
        />
      ))}
    </div>
  );
}