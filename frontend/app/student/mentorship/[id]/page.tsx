import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import { mentors } from "@/data/mentors";
import MentorProfileActions from "@/components/mentorship/MentorProfileActions";

interface MentorProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MentorProfilePage({
  params,
}: MentorProfilePageProps) {
  const { id } = await params;

  const mentor = mentors.find(
    (item) => item.id === Number(id)
  );

  if (!mentor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-10">
        {/* Back */}
        <Link
          href="/student/mentorship"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Mentorship
        </Link>

        {/* Profile Header */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
                {mentor.name.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {mentor.name}
                </h1>

                <p className="mt-1 text-lg text-muted-foreground">
                  {mentor.role}
                </p>

                <p className="mt-1 font-medium">
                  {mentor.company}
                </p>

                {mentor.available && (
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    Available for Mentorship
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-primary/5 px-5 py-4">
              <p className="text-sm text-muted-foreground">
                Experience
              </p>

              <p className="mt-1 text-lg font-semibold text-primary">
                {mentor.experience}
              </p>
            </div>
          </div>

          {/* Quick Details */}
          <div className="mt-10 grid gap-6 border-t pt-8 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Company
                </p>

                <p className="font-medium">
                  {mentor.company}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Experience
                </p>

                <p className="font-medium">
                  {mentor.experience}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Location
                </p>

                <p className="font-medium">
                  {mentor.location}
                </p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              About
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              {mentor.name} is a {mentor.role} at{" "}
              {mentor.company} with {mentor.experience} of
              professional experience. They are passionate
              about sharing knowledge, guiding students,
              and helping them grow in their careers.
            </p>
          </div>

          {/* Expertise */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              Areas of Expertise
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {mentor.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mentorship CTA */}
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-2xl font-bold">
              Interested in Mentorship?
            </h2>

            <p className="mt-3 text-muted-foreground">
              Connect with {mentor.name} and learn from their professional journey.
            </p>

            <div className="mt-6">
              <MentorProfileActions
                mentorName={mentor.name}
                available={mentor.available}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}