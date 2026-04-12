"use client";

import { STATUS_LABELS } from "@/lib/types";
import type { Task } from "@/lib/types";
import { getStatusColor, cn } from "@/lib/utils";

interface StatusSummaryProps {
  tasks: Task[];
}

const statusOrder: Task["status"][] = [
  "Not Started",
  "In Progress",
  "Done",
  "Blocked",
];

export function StatusSummary({ tasks }: StatusSummaryProps) {
  const counts = statusOrder.map((status) => ({
    status,
    label: STATUS_LABELS[status],
    count: tasks.filter((t) => t.status === status).length,
    color: getStatusColor(status),
  }));

  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-xs text-muted-foreground">Estado das Tarefas</p>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
        {counts.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", item.color)} />
            <span className="text-lg font-semibold tabular-nums">{item.count}</span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
