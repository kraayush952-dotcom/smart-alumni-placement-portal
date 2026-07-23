interface JobFiltersProps {
  location: string;
  jobType: string;
  onLocationChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
  onReset: () => void;
}

export default function JobFilters({
  location,
  jobType,
  onLocationChange,
  onJobTypeChange,
  onReset,
}: JobFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        className="rounded-lg border px-4 py-2"
      >
        <option value="">All Locations</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Remote">Remote</option>
      </select>

      <select
        value={jobType}
        onChange={(e) => onJobTypeChange(e.target.value)}
        className="rounded-lg border px-4 py-2"
      >
        <option value="">All Job Types</option>
        <option value="Full Time">Full Time</option>
        <option value="Internship">Internship</option>
        <option value="Part Time">Part Time</option>
      </select>

      <button
        onClick={onReset}
        className="rounded-lg border px-4 py-2 transition hover:bg-muted"
      >
        Reset
      </button>
    </div>
  );
}