export default function JobFilters() {
  return (
    <div className="flex flex-wrap gap-3">
      <select className="rounded-lg border px-4 py-2">
        <option>Location</option>
        <option>Bangalore</option>
        <option>Hyderabad</option>
        <option>Remote</option>
      </select>

      <select className="rounded-lg border px-4 py-2">
        <option>Experience</option>
        <option>Fresher</option>
        <option>1+ Years</option>
        <option>2+ Years</option>
      </select>

      <select className="rounded-lg border px-4 py-2">
        <option>Job Type</option>
        <option>Full Time</option>
        <option>Internship</option>
        <option>Part Time</option>
      </select>

      <button className="rounded-lg border px-4 py-2 hover:bg-muted transition">
        Reset
      </button>
    </div>
  );
}