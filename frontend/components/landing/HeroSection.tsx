import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Left */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            Smart Alumni & Placement Portal
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Your Career, Guided by{" "}
            <span className="text-primary">Alumni Connections.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Empowering students and alumni to connect, share opportunities,
            mentor, and grow — all on one unified career platform.
          </p>

          <div className="mt-8 flex gap-4">
            <Button size="lg">Get Started</Button>

            <Button variant="outline" size="lg">
              Browse Opportunities
            </Button>
          </div>

          {/* Trust Chips */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Verified Alumni</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Placement Support</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Mentorship Network</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full max-w-xl">
          <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-lg">
            {/* Header */}
            <div className="border-b border-border px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">
                Smart Alumni Portal
              </h3>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <span>Search alumni, jobs or internships...</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-6">
              {/* Recent Jobs Card */}
              <div className="rounded-2xl border border-border p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-5 w-5 text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Recent Jobs
                    </p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    New
                  </span>
                </div>

                <h4 className="mt-4 font-semibold text-foreground">
                  Software Engineer Intern
                </h4>

                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Microsoft • Hyderabad</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Mentor Card */}
              <div className="rounded-2xl border border-border p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Find a Mentor
                    </p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Active
                  </span>
                </div>

                <h4 className="mt-4 font-semibold">Web Development</h4>

                <p className="mt-2 text-sm text-muted-foreground">
                  100+ verified mentors available
                </p>
              </div>

              {/* Alumni Card */}
              <div className="rounded-2xl border border-border p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Alumni Network
                    </p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Verified
                  </span>
                </div>

                <h4 className="mt-4 font-semibold">500+ Active Alumni</h4>

                <p className="mt-2 text-sm text-muted-foreground">
                  Connect with professionals across industries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}