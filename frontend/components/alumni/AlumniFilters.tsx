export default function AlumniFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <select className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10">
        <option>All Companies</option>
        <option>Google</option>
        <option>Microsoft</option>
        <option>Amazon</option>
      </select>

      <select className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10">
        <option>All Experience</option>
        <option>1+ Years</option>
        <option>3+ Years</option>
        <option>5+ Years</option>
      </select>

      <select className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10">
        <option>All Skills</option>
        <option>React</option>
        <option>Java</option>
        <option>AWS</option>
      </select>
    </div>
  );
}