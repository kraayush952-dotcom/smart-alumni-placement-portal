import JobSearch from "@/components/jobs/JobSearch";
import JobFilters from "@/components/jobs/JobFilters";
import JobGrid from "@/components/jobs/JobGrid";

export default function JobsPage() {
  return (
    <main className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
        <p className="text-muted-foreground mt-1">
          Discover jobs that match your skills and interests.
        </p>
      </div>

      {/* Search Bar */}
      <JobSearch />

      {/* Filters */}
      <JobFilters />

      {/* Job List */}
      <JobGrid />
    </main>
  ); 
}