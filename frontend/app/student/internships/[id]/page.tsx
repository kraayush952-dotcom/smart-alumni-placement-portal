import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  IndianRupee,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import { internships } from "@/data/internships";

interface InternshipDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InternshipDetailsPage({
  params,
}: InternshipDetailsPageProps) {
  const { id } = await params;

  const internship = internships.find(
    (item) => item.id === Number(id)
  );

  if (!internship) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/student/internships"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Internships
        </Link>

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
              <Building2 className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {internship.company}
              </h1>

              <p className="mt-1 text-lg text-gray-600">
                {internship.title}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{internship.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{internship.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IndianRupee className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Stipend</p>
                <p className="font-medium">{internship.stipend}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Mode</p>
                <p className="font-medium">{internship.mode}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Recruiter</p>
                <p className="font-medium">{internship.recruiter}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{internship.email}</p>
              </div>
            </div>

          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">
              Internship Description
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {internship.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}