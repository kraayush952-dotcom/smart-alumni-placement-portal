import { Search } from "lucide-react";

export default function JobSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        type="text"
        placeholder="Search jobs, companies, or skills..."
        className="w-full rounded-lg border bg-background py-3 pl-12 pr-4 outline-none transition focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}