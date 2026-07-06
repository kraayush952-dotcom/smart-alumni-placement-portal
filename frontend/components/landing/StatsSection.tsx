import {
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Verified Alumni",
  },
  {
    icon: Briefcase,
    value: "250+",
    label: "Job Opportunities",
  },
  {
    icon: GraduationCap,
    value: "120+",
    label: "Active Mentors",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Placement Support",
  },
];

export default function StatsSection() {
  return (
    <section className="border-t bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
            Platform Impact
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Building Careers
            <br />
            <span className="text-primary">Through Connections</span>
          </h2>

          <p className="mt-6 text-xl leading-9 text-muted-foreground">
            Empowering students and alumni with opportunities,
            mentorship, and professional growth across one unified
            platform.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-3xl border border-border/70 bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>

              <span className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {stat.value}
              </span>

              <span className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}