import SearchBar from "@/components/alumni/SearchBar";
import AlumniFilters from "@/components/alumni/AlumniFilters";
import AlumniGrid from "@/components/alumni/AlumniGrid";

import { alumni } from "@/data/alumni";

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Alumni Directory
          </h1>

          <p className="mt-2 text-muted-foreground">
            Connect with successful alumni, grow your network, and learn from their journey.
          </p>
        </div>

        <div className="space-y-6">
          <SearchBar />

          <AlumniFilters />

          <AlumniGrid alumni={alumni} />
        </div>
      </section>
    </main>
  );
}