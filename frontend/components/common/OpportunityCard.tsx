import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

type OpportunityCardProps = {
  company: string;
  title: string;
  location: string;
  badge: string;
};

export default function OpportunityCard({
  company,
  title,
  location,
  badge,
}: OpportunityCardProps) {
  return (
    <div className="rounded-3xl border border-border/70 bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {badge}
        </span>

        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
      </div>

      <h3 className="mt-5 text-xl font-semibold">
        {title}
      </h3>

      <div className="mt-5 space-y-3 text-muted-foreground">

        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>{company}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>

      </div>

      <Button className="mt-6 w-full">
        Apply Now
      </Button>
    </div>
  );
}