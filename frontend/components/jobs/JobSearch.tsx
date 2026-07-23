import { Search } from "lucide-react";

interface JobSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function JobSearch({
  searchTerm,
  onSearchChange,
}: JobSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        type="text"
        placeholder="Search jobs, companies, or skills..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border bg-background py-3 pl-12 pr-4 outline-none transition focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}