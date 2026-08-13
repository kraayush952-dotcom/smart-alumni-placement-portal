"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  ExternalLink,
  MapPin,
  Star,
} from "lucide-react";

import { Alumni } from "@/types/alumni";
import RequestMentorshipModal from "@/components/mentorship/RequestMentorshipModal";

interface AlumniDetailsProps {
  person: Alumni;
}

export default function AlumniDetails({
  person,
}: AlumniDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/student/alumni"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Alumni
        </Link>

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
                {person.name.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {person.name}
                </h1>

                <p className="mt-1 text-lg text-muted-foreground">
                  {person.role}
                </p>

                {person.featured && (
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                    <Star className="h-3 w-3 fill-current" />
                    Featured Alumni
                  </span>
                )}
              </div>
            </div>

            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border p-3 transition hover:bg-muted"
            >
              <ExternalLink className="h-5 w-5 text-primary" />
            </a>
          </div>

          {/* Details */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Company
                </p>

                <p className="font-medium">
                  {person.company}
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
                  {person.experience}
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
                  {person.location}
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
              {person.name} is currently working at{" "}
              {person.company} as a {person.role}. Passionate
              about software engineering, problem solving,
              and helping students grow through mentorship.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {person.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Career Journey */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              Career Journey
            </h2>

            <div className="mt-5 space-y-4">
              {person.career.map((company, index) => (
                <div
                  key={company}
                  className="relative flex items-start gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-primary" />

                    {index !== person.career.length - 1 && (
                      <div className="mt-1 h-10 w-0.5 bg-primary/30" />
                    )}
                  </div>

                  <div className="pb-6">
                    <p className="font-semibold">
                      {company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              Achievements
            </h2>

            <div className="mt-5 space-y-3">
              {person.achievements.map((achievement) => (
                <div
                  key={achievement}
                  className="flex items-center gap-3 rounded-xl border p-4"
                >
                  <span className="text-xl">🏆</span>
                  <p>{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mt-10 rounded-2xl border bg-muted/30 p-6">
            <h2 className="text-xl font-semibold">
              Contact
            </h2>

            <p className="mt-4 text-sm text-muted-foreground">
              Email
            </p>

            <p className="font-medium">
              {person.email}
            </p>

            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Visit LinkedIn
            </a>
          </div>

          {/* Mentorship */}
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-2xl font-bold">
              Interested in Mentorship?
            </h2>

            <p className="mt-3 text-muted-foreground">
              Connect with {person.name} and learn from their
              professional journey.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Request Mentorship
            </button>
          </div>
        </div>
      </section>

      {/* Request Mentorship Modal */}
      {isModalOpen && (
        <RequestMentorshipModal
          mentorName={person.name}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}