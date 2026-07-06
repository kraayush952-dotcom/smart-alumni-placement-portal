import OpportunityCard from "@/components/common/OpportunityCard";

const jobs = [
  {
    id: 1,
    company: "Microsoft",
    title: "Software Engineer Intern",
    location: "Hyderabad",
    type: "Internship",
  },
  {
    id: 2,
    company: "Google",
    title: "Frontend Developer",
    location: "Bengaluru",
    type: "Full Time",
  },
];

const internships = [
  {
    id: 1,
    company: "Amazon",
    title: "SDE Intern",
    location: "Remote",
    duration: "6 Months",
  },
  {
    id: 2,
    company: "TCS",
    title: "Frontend Intern",
    location: "Hyderabad",
    duration: "3 Months",
  },
];

export default function FeaturedOpportunities() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            Featured Opportunities
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Find Your Next
            <span className="block text-primary">
              Career Opportunity
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover the latest jobs and internships shared by verified
            alumni and trusted recruiters.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Jobs */}

          <div>

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-2xl font-semibold">
                Latest Jobs
              </h3>

              <button className="text-sm font-medium text-primary hover:underline">
                View All
              </button>

            </div>

            <div className="space-y-6">

              {jobs.map((job) => (

                <OpportunityCard
                  key={job.id}
                  company={job.company}
                  title={job.title}
                  location={job.location}
                  badge={job.type}
                />

              ))}

            </div>

          </div>

          {/* Internships */}

          <div>

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-2xl font-semibold">
                Latest Internships
              </h3>

              <button className="text-sm font-medium text-primary hover:underline">
                View All
              </button>

            </div>

            <div className="space-y-6">

              {internships.map((internship) => (

                <OpportunityCard
                  key={internship.id}
                  company={internship.company}
                  title={internship.title}
                  location={internship.location}
                  badge={internship.duration}
                />

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}