import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import { applications } from "@/data/applications";

interface ApplicationDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApplicationDetailsPage({
  params,
}: ApplicationDetailsPageProps) {
  const { id } = await params;

  const application = applications.find(
    (application) => application.id === Number(id)
  );

  if (!application) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-10">
        {/* Back Button */}
        <Link
          href="/student/applications"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Link>

        {/* Main Card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
              <Building2 className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {application.company}
              </h1>

              <p className="mt-1 text-lg text-gray-600">
                {application.jobTitle}
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{application.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Applied On</p>
                <p className="font-medium">{application.appliedAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Recruiter</p>
                <p className="font-medium">{application.recruiter}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{application.email}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Application Status</h2>

            <span
              className={`mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                application.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : application.status === "Shortlisted"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {application.status}
            </span>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">
              Application Update
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {application.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}