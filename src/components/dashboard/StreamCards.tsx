"use client";

import { Progress } from "@/components/ui/progress";
import type { Stream, Task } from "@/lib/types";

interface StreamCardsProps {
  streams: Stream[];
  tasks: Task[];
}

export function StreamCards({ streams, tasks }: StreamCardsProps) {
  return (
    <div>
      <p className="mb-3 text-xs text-muted-foreground">Progresso por Stream</p>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {streams.map((stream) => {
          const streamTasks = tasks.filter((t) => t.stream_id === stream.id);
          const total = streamTasks.length;
          const avg =
            total > 0
              ? Math.round(
                  streamTasks.reduce((s, t) => s + t.completion_pct, 0) / total
                )
              : 0;
          const done = streamTasks.filter((t) => t.status === "Done").length;
          const risk = streamTasks.filter((t) => t.has_risk).length;

          return (
            <div
              key={stream.id}
              className="flex items-center gap-3 rounded-lg border border-border p-3"
            >
              <div
                className="h-8 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: stream.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{stream.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Progress value={avg} className="h-1 flex-1" />
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {done}/{total}
                  </span>
                </div>
                {risk > 0 && (
                  <p className="mt-0.5 text-[10px] text-amber-600">
                    {risk} com risco
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
