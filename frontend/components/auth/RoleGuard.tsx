"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "student" | "alumni" | "admin";

interface RoleGuardProps {
  allowedRole: Role;
  children: React.ReactNode;
}

export default function RoleGuard({
  allowedRole,
  children,
}: RoleGuardProps) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      const userRole = user.role?.toLowerCase();

      if (userRole !== allowedRole) {
        router.replace("/login");
        return;
      }

      setAuthorized(true);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.replace("/login");
    } finally {
      setChecking(false);
    }
  }, [allowedRole, router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Checking access...
        </p>
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}