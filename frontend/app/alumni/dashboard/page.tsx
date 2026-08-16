import RoleGuard from "@/components/auth/RoleGuard";

export default function AlumniDashboardPage() {
  return (
    <RoleGuard allowedRole="alumni">
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">
          Alumni Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome to the Alumni Portal.
        </p>
      </main>
    </RoleGuard>
  );
}