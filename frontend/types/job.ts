export interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  match: number;

  postedAt: string;
  featured: boolean;
  skills: string[];
}