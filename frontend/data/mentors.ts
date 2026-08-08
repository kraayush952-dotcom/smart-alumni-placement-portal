import { Mentor } from "@/types/mentorship";

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    experience: "6+ Years",
    location: "Bangalore, India",
    skills: ["Java", "System Design", "DSA"],
    available: true,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Product Manager",
    company: "Microsoft",
    experience: "5+ Years",
    location: "Hyderabad, India",
    skills: [
      "Product Management",
      "Strategy",
      "Leadership",
    ],
    available: true,
  },
  {
    id: 3,
    name: "Aman Kumar",
    role: "Software Engineer",
    company: "Amazon",
    experience: "4+ Years",
    location: "Bangalore, India",
    skills: ["React", "Node.js", "AWS"],
    available: false,
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Data Scientist",
    company: "Adobe",
    experience: "5+ Years",
    location: "Noida, India",
    skills: ["Python", "Machine Learning", "SQL"],
    available: true,
  },
];