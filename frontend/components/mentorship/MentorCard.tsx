"use client";

import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import RequestMentorshipModal from "./RequestMentorshipModal";

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  experience: string;
  location: string;
  skills: string[];
  available: boolean;
}

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({
  mentor,
}: MentorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary transition-transform duration-300 group-hover:scale-105">
              {mentor.name.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold">
                {mentor.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {mentor.role}
              </p>

              <p className="mt-1 text-sm font-medium">
                {mentor.company}
              </p>
            </div>
          </div>

          {mentor.available && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              <CheckCircle2 className="h-3 w-3" />
              Available
            </span>
          )}
        </div>

        {/* Details */}
        <div className="mt-5 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4" />
            <span>{mentor.experience} experience</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{mentor.location}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {mentor.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            View Profile
          </button>

          <button
            type="button"
            disabled={!mentor.available}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Request Mentorship
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Request Mentorship Modal */}
      {isModalOpen && (
        <RequestMentorshipModal
          mentorName={mentor.name}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}