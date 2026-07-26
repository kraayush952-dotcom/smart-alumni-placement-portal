import InternshipGrid from "@/components/internships/InternshipGrid";
import { internships } from "@/data/internships";

export default function InternshipsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Internship Opportunities
          </h1>

          <p className="mt-2 text-gray-600">
            Explore the latest internships from top companies.
          </p>
        </div>

        <InternshipGrid internships={internships} />
      </section>
    </main>
  );
}