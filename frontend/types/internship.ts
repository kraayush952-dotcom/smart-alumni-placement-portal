export interface Internship {
  id: number;
  company: string;
  title: string;
  location: string;
  duration: string;
  stipend: string;
  mode: "Remote" | "Hybrid" | "Onsite";
}