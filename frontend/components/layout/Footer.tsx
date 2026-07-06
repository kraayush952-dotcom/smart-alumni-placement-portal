import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Internships", href: "/internships" },
  { name: "Mentorship", href: "/mentorship" },
];

const resources = [
  { name: "About", href: "/about" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                V
              </div>

              <div>
                <h3 className="font-semibold">
                  Smart Alumni
                </h3>

                <p className="text-sm text-muted-foreground">
                  Placement Portal
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Connecting students, alumni and career
              opportunities through one modern platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold">
              Resources
            </h4>

            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@vignan.edu</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Ap, Guntur</span>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm text-muted-foreground">
                Follow us on social platforms (Coming Soon)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 Vignan Smart Alumni & Placement Portal.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}