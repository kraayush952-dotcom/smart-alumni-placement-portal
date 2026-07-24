import ApplicationCard from "./ApplicationCard";
import { Application } from "@/types/application";

interface ApplicationGridProps {
  applications: Application[];
}

export default function ApplicationGrid({
  applications,
}: ApplicationGridProps) {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          No Applications Found
        </h2>

        <p className="mt-2 text-gray-600">
          You haven't applied for any jobs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
        />
      ))}
    </div>
  );
}