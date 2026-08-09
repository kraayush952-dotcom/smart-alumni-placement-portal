"use client";

import { useState } from "react";

import RequestMentorshipModal from "./RequestMentorshipModal";

interface MentorProfileActionsProps {
  mentorName: string;
  available: boolean;
}

export default function MentorProfileActions({
  mentorName,
  available,
}: MentorProfileActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        disabled={!available}
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Request Mentorship
      </button>

      {isModalOpen && (
        <RequestMentorshipModal
          mentorName={mentorName}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}