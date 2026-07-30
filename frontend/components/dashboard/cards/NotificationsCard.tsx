import { Bell, ChevronRight } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  time: string;
  unread?: boolean;
}

interface NotificationsCardProps {
  notifications: Notification[];
}

export default function NotificationsCard({
  notifications,
}: NotificationsCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
            <Bell className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Latest updates
            </p>
          </div>
        </div>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="group/item flex items-start justify-between rounded-xl p-4 transition-all duration-300 hover:bg-muted/40 hover:shadow-sm"
          >
            <div className="flex gap-3">
              <div
                className={`mt-2 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover/item:scale-125 ${
                  item.unread ? "bg-red-500" : "bg-green-500"
                }`}
              />

              <div>
                <p className="text-sm font-medium leading-5">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.time}
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover/item:translate-x-1" />
          </div>
        ))}
      </div>
    </div>
  );
}