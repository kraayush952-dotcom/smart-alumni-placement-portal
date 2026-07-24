import { applications } from "@/data/applications";
import ApplicationGrid from "@/components/applications/ApplicationGrid";

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Applications
          </h1>

          <p className="mt-2 text-gray-600">
            Track all your job applications in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6">
            <p className="text-sm text-gray-500">Total Applications</p>
            <h2 className="mt-2 text-3xl font-bold">
              {applications.length}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {
                applications.filter(
                  (application) =>
                    application.status === "Pending"
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <p className="text-sm text-gray-500">Shortlisted</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {
                applications.filter(
                  (application) =>
                    application.status === "Shortlisted"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Applications */}
        <ApplicationGrid applications={applications} />
      </section>
    </main>
  );
}