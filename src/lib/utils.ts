import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInCalendarDays,
  format,
  parseISO,
  isAfter,
} from "date-fns";
import { pt } from "date-fns/locale";
import { GO_LIVE_DATE } from "./types";
import type { Task, Stream } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysUntilGoLive(): number {
  return differenceInCalendarDays(parseISO(GO_LIVE_DATE), new Date());
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return format(parseISO(dateStr), "d MMM", { locale: pt });
}

export function formatDateFull(dateStr: string | null): string {
  if (!dateStr) return "—";
  return format(parseISO(dateStr), "d 'de' MMMM yyyy", { locale: pt });
}

export function isOverdue(task: Task): boolean {
  if (task.status === "Done") return false;
  if (!task.end_date) return false;
  return isAfter(new Date(), parseISO(task.end_date));
}

export function isAtRisk(task: Task): boolean {
  if (task.status === "Done") return false;
  if (!task.end_date) return false;
  const daysLeft = differenceInCalendarDays(parseISO(task.end_date), new Date());
  return daysLeft <= 3 && daysLeft >= 0 && task.completion_pct < 80;
}

export function isUpcoming(task: Task): boolean {
  if (!task.start_date) return false;
  const daysUntilStart = differenceInCalendarDays(
    parseISO(task.start_date),
    new Date()
  );
  return daysUntilStart > 0 && daysUntilStart <= 7;
}

export function getStatusColor(status: Task["status"]): string {
  switch (status) {
    case "Not Started":
      return "bg-zinc-500";
    case "In Progress":
      return "bg-blue-500";
    case "Done":
      return "bg-emerald-500";
    case "Blocked":
      return "bg-red-500";
  }
}

export function getTaskIndex(
  task: Task,
  tasks: Task[],
  streams: Stream[]
): string {
  const streamIdx = streams.findIndex((s) => s.id === task.stream_id);
  if (streamIdx === -1) return "?";
  const streamTasks = tasks
    .filter((t) => t.stream_id === task.stream_id)
    .sort((a, b) => a.position - b.position);
  const taskIdx = streamTasks.findIndex((t) => t.id === task.id);
  return `${streamIdx + 1}.${taskIdx + 1}`;
}

export function getStatusBadgeVariant(
  status: Task["status"]
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Done":
      return "default";
    case "In Progress":
      return "secondary";
    case "Blocked":
      return "destructive";
    default:
      return "outline";
  }
}
