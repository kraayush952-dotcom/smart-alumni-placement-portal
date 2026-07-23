import { jobs } from "@/data/jobs";
import { notFound } from "next/navigation";

interface JobDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { id } = await params;

  const job = jobs.find((job) => job.id === Number(id));

  if (!job) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8 py-8">
      <div>
        <h1 className="text-4xl font-bold">{job.title}</h1>

        <p className="mt-2 text-lg text-muted-foreground">
          {job.company}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
        <span>💰 {job.salary}</span>
        <span>⏰ {job.postedAt}</span>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-semibold">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-semibold">
          About this Job
        </h2>

        <p className="leading-7 text-muted-foreground">
          {job.description}
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-semibold">
          Requirements
        </h2>

        <ul className="list-disc space-y-2 pl-5">
          {job.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
        Apply Now
      </button>
    </main>
  );
}