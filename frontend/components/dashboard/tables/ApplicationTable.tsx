import { ExternalLink } from "lucide-react";

interface Application {
  company: string;
  role: string;
  status: "Applied" | "Reviewing" | "Interview";
  date: string;
}

interface ApplicationTableProps {
  applications: Application[];
}

const statusStyles = {
  Applied: "border-blue-200 bg-blue-50 text-blue-700",
  Reviewing: "border-yellow-200 bg-yellow-50 text-yellow-700",
  Interview: "border-green-200 bg-green-50 text-green-700",
};

export default function ApplicationTable({
  applications,
}: ApplicationTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Applications
        </h2>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm font-medium text-muted-foreground">
              <th className="pb-3">Company</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Applied</th>
              <th className="pb-3"></th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={`${app.company}-${app.role}`}
                className="group border-b last:border-none transition-all duration-300 hover:bg-muted/30"
              >
                <td className="py-4 font-semibold">
                  {app.company}
                </td>

                <td>{app.role}</td>

                <td>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>

                <td>{app.date}</td>

                <td>
                  <button className="rounded-lg p-2 text-primary transition-all duration-300 hover:bg-primary/10 group-hover:scale-110">
                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}