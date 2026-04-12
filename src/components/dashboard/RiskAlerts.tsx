"use client";

import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { isOverdue, isAtRisk, formatDate } from "@/lib/utils";
import type { Task, Stream } from "@/lib/types";

interface RiskAlertsProps {
  tasks: Task[];
  streams: Stream[];
}

export function RiskAlerts({ tasks, streams }: RiskAlertsProps) {
  const overdueTasks = tasks.filter(isOverdue);
  const atRiskTasks = tasks.filter(isAtRisk);
  const riskTasks = tasks.filter((t) => t.has_risk && t.status !== "Done");
  const blockedTasks = tasks.filter((t) => t.status === "Blocked");

  const alerts = [
    ...overdueTasks.map((t) => ({ task: t, type: "overdue" as const })),
    ...blockedTasks.map((t) => ({ task: t, type: "blocked" as const })),
    ...atRiskTasks
      .filter((t) => !overdueTasks.includes(t))
      .map((t) => ({ task: t, type: "at-risk" as const })),
    ...riskTasks
      .filter((t) => !overdueTasks.includes(t) && !atRiskTasks.includes(t) && !blockedTasks.includes(t))
      .map((t) => ({ task: t, type: "risk" as const })),
  ];

  const getStreamName = (streamId: number) =>
    streams.find((s) => s.id === streamId)?.name ?? "";

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center gap-1.5">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
        <p className="text-xs text-muted-foreground">
          Alertas{alerts.length > 0 ? ` (${alerts.length})` : ""}
        </p>
      </div>

      {alerts.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">Sem alertas.</p>
      ) : (
        <div className="mt-3 space-y-1.5 max-h-64 overflow-y-auto">
          {alerts.slice(0, 12).map(({ task, type }) => (
            <div
              key={task.id}
              className="flex items-start gap-2 rounded-md py-1 text-xs"
            >
              {type === "overdue" ? (
                <Clock className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
              ) : (
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate">
                  <span className="font-mono text-muted-foreground">{task.id}</span>{" "}
                  {task.name}
                </p>
                <p className="text-muted-foreground">
                  {getStreamName(task.stream_id)} · {formatDate(task.end_date)}
                </p>
              </div>
              <Badge
                variant={
                  type === "overdue" || type === "blocked"
                    ? "destructive"
                    : "outline"
                }
                className="shrink-0 text-[10px] font-normal"
              >
                {type === "overdue"
                  ? "Atrasada"
                  : type === "blocked"
                    ? "Bloqueada"
                    : type === "at-risk"
                      ? "Em risco"
                      : task.risk_impact ?? "Risco"}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
