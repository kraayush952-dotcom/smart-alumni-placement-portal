export type ApplicationStatus =
  | "Pending"
  | "Shortlisted"
  | "Rejected";

export interface Application {
  id: number;
  company: string;
  jobTitle: string;
  location: string;
  status: ApplicationStatus;
  appliedAt: string;
}