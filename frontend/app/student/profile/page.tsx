import {
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";

const student = {
  name: "Ayush Kumar",
  email: "ayush@example.com",
  course: "Btech",
  college: "Vignan University",
  location: "India",
  skills: ["Java", "React", "Next.js", "SQL", "Git"],
  about:
    "B.Tech student passionate about software development, problem solving, and building real-world projects.",
  completion: 75,
};

export default function StudentProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-10">
        {/* Profile Header */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
              {student.name.charAt(0)}
            </div>

            {/* Basic Info */}
            <div>
              <h1 className="text-3xl font-bold">
                {student.name}
              </h1>

              <p className="mt-1 text-lg text-muted-foreground">
                {student.course} Student
              </p>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  {student.college}
                </span>

                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {student.location}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mt-8 rounded-xl bg-primary/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Profile Completion
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Complete your profile to improve your opportunities.
                </p>
              </div>

              <span className="text-lg font-bold text-primary">
                {student.completion}%
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary/10">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${student.completion}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Contact & Education */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Contact Information
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {student.email}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Education
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Course
                </p>

                <p className="font-medium">
                  {student.course}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {student.college}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            About
          </h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            {student.about}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {student.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Status */}
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <div>
              <h2 className="font-semibold text-green-800">
                Profile is active
              </h2>

              <p className="mt-1 text-sm text-green-700">
                Your profile can be viewed for career opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}