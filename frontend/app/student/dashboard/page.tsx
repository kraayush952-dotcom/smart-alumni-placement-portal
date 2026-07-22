import {
  Briefcase,
  Bookmark,
  CalendarDays,
  FileText,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ProfileCompletionCard from "@/components/dashboard/cards/ProfileCompletionCard";
import StatCard from "@/components/dashboard/cards/StatCard";
import ApplicationTable from "@/components/dashboard/tables/ApplicationTable";
import NotificationsCard from "@/components/dashboard/cards/NotificationsCard";
import RecommendedJobsCard from "@/components/dashboard/cards/RecommendedJobsCard";
import QuickActionsCard from "@/components/dashboard/cards/QuickActionsCard";
import { studentMenu } from "@/constants/dashboard/student-menu";

export default function StudentDashboardPage() {
  const applications = [
    {
      company: "Google",
      role: "Software Engineer Intern",
      status: "Reviewing" as const,
      date: "20 Jul 2026",
    },
    {
      company: "Microsoft",
      role: "Frontend Developer",
      status: "Interview" as const,
      date: "18 Jul 2026",
    },
    {
      company: "TCS",
      role: "Java Developer",
      status: "Applied" as const,
      date: "16 Jul 2026",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Interview with Microsoft tomorrow",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Google viewed your resume",
      time: "Yesterday",
      unread: true,
    },
    {
      id: 3,
      title: "5 new Java jobs available",
      time: "2 days ago",
      unread: false,
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer Intern",
      location: "Bangalore",
      salary: "₹12 LPA",
      match: 92,
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Frontend Developer",
      location: "Hyderabad",
      salary: "₹10 LPA",
      match: 88,
    },
  ];

  return (
    <DashboardLayout menu={studentMenu}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome Back 
          </h1>

          <p className="mt-2 text-muted-foreground">
            Here's an overview of your placement journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Jobs Applied"
            value={12}
            description="Applications submitted"
            icon={Briefcase}
          />

          <StatCard
            title="Saved Jobs"
            value={8}
            description="Ready to apply"
            icon={Bookmark}
          />

          <StatCard
            title="Upcoming Interviews"
            value={3}
            description="Scheduled this week"
            icon={CalendarDays}
          />

          <StatCard
            title="Active Applications"
            value={6}
            description="Currently under review"
            icon={FileText}
          />
        </div>

        {/* Bottom Section */}
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid gap-6 lg:grid-cols-3">
            <ProfileCompletionCard progress={85} />

            <div className="lg:col-span-2">
              <ApplicationTable applications={applications} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid gap-6 lg:grid-cols-3">
            <NotificationsCard notifications={notifications} />

            <div className="lg:col-span-2">
              <RecommendedJobsCard jobs={recommendedJobs} />
            </div>
          </div>

          {/* Row 3 */}
          <QuickActionsCard />
        </div>
      </div>
    </DashboardLayout>
  );
}