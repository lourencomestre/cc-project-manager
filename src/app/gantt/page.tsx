"use client";

import { useData } from "@/hooks/DataProvider";
import { GanttChart } from "@/components/gantt/GanttChart";
import { Skeleton } from "@/components/ui/skeleton";

export default function GanttPage() {
  const { streams, tasks, loading } = useData();

  if (loading) {
    return <Skeleton className="h-[600px]" />;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Cronograma</h1>
        <p className="text-sm text-muted-foreground">
          Vista Gantt do projeto — 16 abril a 30 junho 2026
        </p>
      </div>
      <GanttChart streams={streams} tasks={tasks} />
    </div>
  );
}
