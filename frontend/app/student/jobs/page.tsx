"use client";

import { useState } from "react";
import JobSearch from "@/components/jobs/JobSearch";
import JobFilters from "@/components/jobs/JobFilters";
import JobGrid from "@/components/jobs/JobGrid";
import { jobs } from "@/data/jobs";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search)
      );

    const matchesLocation =
      location === "" || job.location === location;

    const matchesJobType =
      jobType === "" || job.type === jobType;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType
    );
  });

  const handleReset = () => {
    setSearchTerm("");
    setLocation("");
    setJobType("");
  };

  return (
    <main className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Jobs
        </h1>

        <p className="mt-1 text-muted-foreground">
          Discover jobs that match your skills and interests.
        </p>
      </div>

      {/* Search */}
      <JobSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Filters */}
      <JobFilters
        location={location}
        jobType={jobType}
        onLocationChange={setLocation}
        onJobTypeChange={setJobType}
        onReset={handleReset}
      />

      {/* Jobs */}
      <JobGrid jobs={filteredJobs} />
    </main>
  );
}