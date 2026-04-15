"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { formatDate, getStatusBadgeVariant, getTaskIndex } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/types";
import type { Stream, Task } from "@/lib/types";

interface RiskMatrixProps {
  streams: Stream[];
  tasks: Task[];
}

export function RiskMatrix({ streams, tasks }: RiskMatrixProps) {
  const riskTasks = tasks
    .filter((t) => t.has_risk)
    .sort((a, b) => {
      const order = { Blocked: 0, "In Progress": 1, "Not Started": 2, Done: 3 };
      return order[a.status] - order[b.status];
    });

  const financialCount = riskTasks.filter(
    (t) => t.risk_impact?.includes("Financeiro")
  ).length;
  const operationalCount = riskTasks.filter(
    (t) => t.risk_impact?.includes("Operacional")
  ).length;

  const getStreamName = (streamId: number) =>
    streams.find((s) => s.id === streamId)?.name ?? "";
  const getStreamColor = (streamId: number) =>
    streams.find((s) => s.id === streamId)?.color ?? "#888";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Tarefas com Risco ({riskTasks.length})
          </span>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {financialCount} financeiro
            </Badge>
            <Badge variant="outline" className="text-xs">
              {operationalCount} operacional
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {riskTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma tarefa com risco identificado.
          </p>
        ) : (
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Tarefa</TableHead>
                  <TableHead className="w-36">Stream</TableHead>
                  <TableHead className="w-24">Estado</TableHead>
                  <TableHead className="w-36">Impacto</TableHead>
                  <TableHead className="w-24">Fim</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-mono text-xs">
                      {getTaskIndex(task, tasks, streams)}
                    </TableCell>
                    <TableCell className="text-xs">{task.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: getStreamColor(task.stream_id),
                          }}
                        />
                        <span className="text-xs">
                          {getStreamName(task.stream_id)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(task.status)}
                        className="text-[10px]"
                      >
                        {STATUS_LABELS[task.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">
                        {task.risk_impact}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {formatDate(task.end_date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
