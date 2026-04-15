"use client";

import { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Diamond, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { cn, formatDate, isOverdue, getTaskIndex } from "@/lib/utils";
import { STATUS_LABELS, STATUS_OPTIONS } from "@/lib/types";
import type { Stream, Task } from "@/lib/types";

interface TaskTableProps {
  streams: Stream[];
  tasks: Task[];
  allTasks: Task[];
  onUpdateTask: (taskId: number, updates: Partial<Task>) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export function TaskTable({
  streams,
  tasks,
  allTasks,
  onUpdateTask,
  onEditTask,
  onDeleteTask,
}: TaskTableProps) {
  const grouped = streams
    .map((stream) => ({
      stream,
      tasks: tasks
        .filter((t) => t.stream_id === stream.id)
        .sort((a, b) => a.position - b.position),
    }))
    .filter((g) => g.tasks.length > 0);

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Tarefa</TableHead>
            <TableHead className="w-24">Owner</TableHead>
            <TableHead className="w-20">Tipo</TableHead>
            <TableHead className="w-32">Estado</TableHead>
            <TableHead className="w-16 text-center">%</TableHead>
            <TableHead className="w-20">Início</TableHead>
            <TableHead className="w-20">Fim</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {grouped.map(({ stream, tasks: streamTasks }) => (
            <Fragment key={`stream-${stream.id}`}>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableCell colSpan={9} className="py-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: stream.color }}
                    />
                    <span className="text-xs font-medium">{stream.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {streamTasks.length}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              {streamTasks.map((task) => {
                const index = getTaskIndex(task, allTasks, streams);
                return (
                  <TableRow
                    key={task.id}
                    className={cn(
                      isOverdue(task) && "bg-red-500/5",
                      task.status === "Done" && "opacity-50"
                    )}
                  >
                    <TableCell className="font-mono text-[11px] text-muted-foreground">
                      {index}
                      {task.is_milestone && (
                        <Diamond className="ml-1 inline h-3 w-3 fill-amber-400 text-amber-400" />
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="text-xs leading-snug">{task.name}</p>
                      {task.has_risk && (
                        <span className="text-[10px] text-amber-600">
                          Risco: {task.risk_impact}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {task.owner}
                    </TableCell>
                    <TableCell>
                      <span className="text-[11px] text-muted-foreground">
                        {task.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={task.status}
                        onValueChange={(value: string | null) => {
                          if (value)
                            onUpdateTask(task.id, {
                              status: value as Task["status"],
                            });
                        }}
                      >
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={task.completion_pct}
                        disabled={task.status === "Not Started" || task.status === "Done"}
                        onChange={(e) =>
                          onUpdateTask(task.id, {
                            completion_pct: Math.min(
                              100,
                              Math.max(0, Number(e.target.value))
                            ),
                          })
                        }
                        className="h-7 w-14 text-center text-xs"
                      />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(task.start_date)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(task.end_date)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditTask(task)}>
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
