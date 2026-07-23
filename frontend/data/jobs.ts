import { Job } from "@/types/job";

export const jobs: Job[] = [
  {
    id: 1,
    company: "Google",
    title: "Software Engineer Intern",
    location: "Bangalore",
    type: "Internship",
    salary: "₹12 LPA",
    match: 92,

    postedAt: "2 days ago",
    featured: true,
    skills: ["React", "Java", "Spring Boot"],
  },
  {
    id: 2,
    company: "Microsoft",
    title: "Frontend Developer",
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹10 LPA",
    match: 88,

    postedAt: "1 day ago",
    featured: false,
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    id: 3,
    company: "Amazon",
    title: "Backend Developer",
    location: "Remote",
    type: "Full Time",
    salary: "₹14 LPA",
    match: 95,

    postedAt: "Today",
    featured: true,
    skills: ["Java", "Spring Boot", "AWS"],
  },
];