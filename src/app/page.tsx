"use client";

import { useStreams } from "@/hooks/useStreams";
import { useTasks } from "@/hooks/useTasks";
import { ProjectProgress } from "@/components/dashboard/ProjectProgress";
import { StatusSummary } from "@/components/dashboard/StatusSummary";
import { StreamCards } from "@/components/dashboard/StreamCards";
import { RiskAlerts } from "@/components/dashboard/RiskAlerts";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { streams, loading: streamsLoading } = useStreams();
  const { tasks, loading: tasksLoading } = useTasks();

  if (streamsLoading || tasksLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectProgress tasks={tasks} />
        <StatusSummary tasks={tasks} />
        <RiskAlerts tasks={tasks} streams={streams} />
      </div>
      <StreamCards streams={streams} tasks={tasks} />
    </div>
  );
}
