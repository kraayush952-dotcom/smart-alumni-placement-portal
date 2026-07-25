import { Application } from "@/types/application";

export const applications: Application[] = [
  {
    id: 1,
    company: "Google",
    jobTitle: "Software Engineer Intern",
    location: "Bangalore",
    status: "Pending",
    appliedAt: "20 Jul 2026",
    description:
      "Your application is currently under review by the Google hiring team. If shortlisted, you will receive an interview invitation via email.",
    recruiter: "Priya Sharma",
    email: "careers@google.com",
  },

  {
    id: 2,
    company: "Microsoft",
    jobTitle: "Frontend Developer",
    location: "Hyderabad",
    status: "Shortlisted",
    appliedAt: "18 Jul 2026",
    description:
      "Congratulations! Your profile has been shortlisted. Our recruitment team will contact you soon for the next interview round.",
    recruiter: "Rahul Verma",
    email: "careers@microsoft.com",
  },

  {
    id: 3,
    company: "Amazon",
    jobTitle: "Backend Developer",
    location: "Chennai",
    status: "Rejected",
    appliedAt: "15 Jul 2026",
    description:
      "Unfortunately, your application was not selected for this role. You are encouraged to apply for future opportunities.",
    recruiter: "Ananya Singh",
    email: "careers@amazon.com",
  },
];