import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Alumni Network",
    description:
      "Connect with verified alumni across different industries and build lifelong professional relationships.",
    icon: Users,
  },
  {
    title: "Job Opportunities",
    description:
      "Discover curated job openings shared by alumni and trusted recruiters.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Internship Portal",
    description:
      "Explore internships that help you gain practical experience before graduation.",
    icon: GraduationCap,
  },
  {
    title: "Mentorship",
    description:
      "Learn directly from experienced alumni through one-on-one mentorship.",
    icon: Handshake,
  },
  {
    title: "Placement Support",
    description:
      "Track placement opportunities and stay prepared throughout your career journey.",
    icon: BarChart3,
  },
  {
    title: "Career Resources",
    description:
      "Access career guides, interview preparation resources, and professional tips.",
    icon: BookOpen,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-muted/30 pt-20 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything You Need to
            <span className="block text-primary">
              Build Your Career
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover opportunities, connect with alumni, gain mentorship,
            and grow through one modern career platform.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex h-full flex-col rounded-3xl border border-border/70 bg-background p-9 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary">
                  Learn More
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}