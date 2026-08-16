import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRole="admin">
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome to the Admin Portal.
        </p>
      </main>
    </RoleGuard>
  );
}