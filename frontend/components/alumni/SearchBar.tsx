import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        type="text"
        placeholder="Search alumni by name, company or skills..."
        className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}