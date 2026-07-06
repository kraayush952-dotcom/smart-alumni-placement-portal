import Link from "next/link";

import { Button } from "@/components/ui/button";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Internships", href: "/internships" },
  { name: "Mentorship", href: "/mentorship" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            V
          </div>

          <div className="hidden sm:block">
            <h1 className="text-base font-semibold">
              Vignan Smart Alumni
            </h1>

            <p className="text-xs text-muted-foreground">
              Placement Portal
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline">
            Login
          </Button>

          <Button>
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}