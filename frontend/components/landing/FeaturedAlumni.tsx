import {
  ArrowRight,
  Building2,
  Briefcase,
  MapPin,
} from "lucide-react";

const featuredAlumni = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Microsoft",
    location: "Hyderabad",
    experience: "3 Years",
  },
  {
    name: "Priya Reddy",
    role: "Frontend Developer",
    company: "Google",
    location: "Bengaluru",
    experience: "2 Years",
  },
  {
    name: "Amit Kumar",
    role: "Backend Engineer",
    company: "Amazon",
    location: "Remote",
    experience: "4 Years",
  },
];

export default function FeaturedAlumni() {
  return (
    <section className="border-t bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-14 text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
            Featured Alumni
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Connect With
            <br />
            <span className="text-primary">
              Successful Alumni
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Learn from experienced alumni working at top companies and grow
            your professional network.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredAlumni.map((alumni) => (
            <div
              key={alumni.name}
              className="flex h-full flex-col rounded-3xl border border-border/70 bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >

              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {alumni.experience}
                </span>

                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">
                  {alumni.name}
                </h3>

                <p className="font-medium text-primary">
                  {alumni.role}
                </p>
              </div>

              <div className="mt-6 flex-1 space-y-4">

                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building2 className="h-5 w-5" />
                  <span>{alumni.company}</span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{alumni.location}</span>
                </div>

              </div>

              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                View Profile
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90">
            View Alumni Network
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}