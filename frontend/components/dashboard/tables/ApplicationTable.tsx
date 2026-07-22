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
  Applied:
    "bg-blue-100 text-blue-700",
  Reviewing:
    "bg-yellow-100 text-yellow-700",
  Interview:
    "bg-green-100 text-green-700",
};

export default function ApplicationTable({
  applications,
}: ApplicationTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
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
            <tr className="border-b text-left text-sm text-muted-foreground">
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
                className="border-b last:border-none hover:bg-muted/40 transition-colors"
              >
                <td className="py-4 font-medium">
                  {app.company}
                </td>

                <td>{app.role}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>

                <td>{app.date}</td>

                <td>
                  <button className="text-primary hover:opacity-80">
                    <ExternalLink className="h-4 w-4" />
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