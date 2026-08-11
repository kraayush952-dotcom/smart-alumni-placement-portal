import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ResumeUpload from "@/components/resume/ResumeUpload";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-6 py-10">
        {/* Back */}
        <Link
          href="/student/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">
            Career Profile
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Resume
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Keep your latest resume ready for job and internship
            opportunities.
          </p>
        </div>

        {/* Resume Upload */}
        <ResumeUpload />
      </section>
    </main>
  );
}