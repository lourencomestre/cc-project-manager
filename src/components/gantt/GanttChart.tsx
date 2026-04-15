"use client";

import { useMemo, useState } from "react";
import {
  differenceInCalendarDays,
  eachWeekOfInterval,
  format,
  parseISO,
  endOfWeek,
  eachMonthOfInterval,
  endOfMonth,
} from "date-fns";
import { pt } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Diamond, ZoomIn, ZoomOut } from "lucide-react";
import { formatDate, getTaskIndex } from "@/lib/utils";
import { PROJECT_START, PROJECT_END, STATUS_LABELS } from "@/lib/types";
import type { Stream, Task } from "@/lib/types";

interface GanttChartProps {
  streams: Stream[];
  tasks: Task[];
}

type ZoomLevel = "weeks" | "months";

export function GanttChart({ streams, tasks }: GanttChartProps) {
  const [zoom, setZoom] = useState<ZoomLevel>("weeks");

  const projectStart = parseISO(PROJECT_START);
  const projectEnd = parseISO(PROJECT_END);
  const totalDays = differenceInCalendarDays(projectEnd, projectStart) + 1;

  const periods = useMemo(() => {
    if (zoom === "weeks") {
      return eachWeekOfInterval(
        { start: projectStart, end: projectEnd },
        { weekStartsOn: 1 }
      ).map((weekStart) => {
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
        return {
          label: format(weekStart, "d MMM", { locale: pt }),
          start: weekStart,
          end: weekEnd > projectEnd ? projectEnd : weekEnd,
        };
      });
    } else {
      return eachMonthOfInterval({ start: projectStart, end: projectEnd }).map(
        (monthStart) => {
          const monthEnd = endOfMonth(monthStart);
          return {
            label: format(monthStart, "MMMM yyyy", { locale: pt }),
            start: monthStart < projectStart ? projectStart : monthStart,
            end: monthEnd > projectEnd ? projectEnd : monthEnd,
          };
        }
      );
    }
  }, [zoom, projectStart, projectEnd]);

  function getBarPosition(startDate: string | null, endDate: string | null) {
    if (!startDate || !endDate) return null;
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const left =
      (differenceInCalendarDays(start, projectStart) / totalDays) * 100;
    const width =
      ((differenceInCalendarDays(end, start) + 1) / totalDays) * 100;
    return {
      left: `${Math.max(0, left)}%`,
      width: `${Math.min(100 - Math.max(0, left), width)}%`,
    };
  }

  const today = new Date();
  const todayPos =
    (differenceInCalendarDays(today, projectStart) / totalDays) * 100;
  const showTodayLine = todayPos >= 0 && todayPos <= 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {format(projectStart, "d MMMM", { locale: pt })} —{" "}
          {format(projectEnd, "d MMMM yyyy", { locale: pt })}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant={zoom === "weeks" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setZoom("weeks")}
          >
            <ZoomIn className="mr-1 h-3 w-3" />
            Semanas
          </Button>
          <Button
            variant={zoom === "months" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setZoom("months")}
          >
            <ZoomOut className="mr-1 h-3 w-3" />
            Meses
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <div className="min-w-[900px]">
          {/* Header with periods */}
          <div className="flex border-b border-border bg-muted/50">
            <div className="w-56 shrink-0 border-r border-border px-3 py-2 text-xs font-medium text-muted-foreground">
              Stream / Tarefa
            </div>
            <div className="relative flex flex-1">
              {periods.map((period, i) => {
                const periodDays =
                  differenceInCalendarDays(period.end, period.start) + 1;
                const widthPct = (periodDays / totalDays) * 100;
                return (
                  <div
                    key={i}
                    className="border-r border-border px-1 py-2 text-center text-[10px] text-muted-foreground"
                    style={{ width: `${widthPct}%` }}
                  >
                    {period.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stream rows */}
          {streams.map((stream) => {
            const streamTasks = tasks
              .filter((t) => t.stream_id === stream.id)
              .sort((a, b) => a.position - b.position);

            if (streamTasks.length === 0) return null;

            return (
              <div key={stream.id}>
                {/* Stream header */}
                <div className="flex border-b border-border bg-muted/30">
                  <div className="flex w-56 shrink-0 items-center gap-2 border-r border-border px-3 py-1.5">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: stream.color }}
                    />
                    <span className="text-xs font-semibold">{stream.name}</span>
                  </div>
                  <div className="relative flex-1">
                    {showTodayLine && (
                      <div
                        className="absolute top-0 h-full w-px bg-red-500/50"
                        style={{ left: `${todayPos}%` }}
                      />
                    )}
                  </div>
                </div>

                {/* Task rows */}
                {streamTasks.map((task) => {
                  const bar = getBarPosition(task.start_date, task.end_date);
                  const index = getTaskIndex(task, tasks, streams);

                  return (
                    <div
                      key={task.id}
                      className="flex border-b border-border last:border-b-0 hover:bg-muted/20"
                    >
                      <div className="w-56 shrink-0 border-r border-border px-3 py-1">
                        <p className="truncate text-[11px]">
                          <span className="font-mono text-muted-foreground">
                            {index}
                          </span>{" "}
                          {task.name}
                        </p>
                      </div>
                      <div className="relative flex-1 py-1">
                        {showTodayLine && (
                          <div
                            className="absolute top-0 h-full w-px bg-red-500/50"
                            style={{ left: `${todayPos}%` }}
                          />
                        )}
                        {bar && (
                          <Tooltip>
                            <TooltipTrigger
                              className="absolute top-1 h-5 rounded-sm cursor-default"
                              style={{
                                left: bar.left,
                                width: bar.width,
                                backgroundColor: stream.color,
                                opacity:
                                  task.status === "Done"
                                    ? 0.4
                                    : task.status === "Blocked"
                                      ? 0.6
                                      : 0.85,
                              }}
                            >
                              {task.completion_pct > 0 && (
                                <div
                                  className="h-full rounded-sm bg-white/20"
                                  style={{
                                    width: `${task.completion_pct}%`,
                                  }}
                                />
                              )}
                              {task.is_milestone && (
                                <Diamond className="absolute -right-1 -top-1 h-3 w-3 fill-amber-400 text-amber-400" />
                              )}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{task.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(task.start_date)} —{" "}
                                {formatDate(task.end_date)} ·{" "}
                                {STATUS_LABELS[task.status]} ·{" "}
                                {task.completion_pct}%
                              </p>
                              {task.has_risk && (
                                <p className="text-xs text-amber-400">
                                  Risco: {task.risk_impact}
                                </p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="h-px w-4 bg-red-500" />
          Hoje
        </div>
        <div className="flex items-center gap-1">
          <Diamond className="h-3 w-3 fill-amber-400 text-amber-400" />
          Milestone
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-8 rounded-sm bg-blue-500 opacity-85" />
          Ativa
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-8 rounded-sm bg-blue-500 opacity-40" />
          Concluída
        </div>
      </div>
    </div>
  );
}
