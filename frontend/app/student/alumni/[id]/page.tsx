import { notFound } from "next/navigation";

import AlumniDetails from "@/components/alumni/AlumniDetails";
import { alumni } from "@/data/alumni";

interface AlumniDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AlumniDetailsPage({
  params,
}: AlumniDetailsPageProps) {
  const { id } = await params;

  const person = alumni.find(
    (item) => item.id === Number(id)
  );

  if (!person) {
    notFound();
  }

  return <AlumniDetails person={person} />;
}