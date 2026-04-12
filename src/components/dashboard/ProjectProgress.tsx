"use client";

import { Progress } from "@/components/ui/progress";
import type { Task } from "@/lib/types";

interface ProjectProgressProps {
  tasks: Task[];
}

export function ProjectProgress({ tasks }: ProjectProgressProps) {
  const totalTasks = tasks.length;
  const avgCompletion =
    totalTasks > 0
      ? Math.round(tasks.reduce((sum, t) => sum + t.completion_pct, 0) / totalTasks)
      : 0;
  const doneTasks = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-xs text-muted-foreground">Progresso Global</p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tabular-nums">{avgCompletion}%</span>
        <span className="text-xs text-muted-foreground">
          {doneTasks}/{totalTasks} concluídas
        </span>
      </div>
      <Progress value={avgCompletion} className="mt-3 h-1.5" />
    </div>
  );
}
