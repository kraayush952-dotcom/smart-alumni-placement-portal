import MentorCard from "@/components/mentorship/MentorCard";
import { mentors } from "@/data/mentors";

export default function MentorshipPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">
            Mentorship
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Learn from Experienced Alumni
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Connect with experienced alumni, get career guidance,
            and learn from their professional journey.
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
            />
          ))}
        </div>
      </section>
    </main>
  );
}