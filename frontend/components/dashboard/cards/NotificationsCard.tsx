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
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
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
            className="flex items-start justify-between rounded-xl p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex gap-3">
              <div
                className={`mt-2 h-2 w-2 rounded-full ${
                  item.unread ? "bg-red-500" : "bg-green-500"
                }`}
              />

              <div>
                <p className="text-sm font-medium">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.time}
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}