"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_OPTIONS, STATUS_LABELS } from "@/lib/types";
import type { Stream, Task } from "@/lib/types";

type TaskFormData = {
  id: string;
  stream_id: number;
  name: string;
  owner: string;
  type: Task["type"];
  has_risk: boolean;
  risk_impact: string | null;
  start_date: string | null;
  end_date: string | null;
  duration_days: number;
  completion_pct: number;
  is_milestone: boolean;
  notes: string | null;
  status: Task["status"];
};

const emptyForm: TaskFormData = {
  id: "",
  stream_id: 1,
  name: "",
  owner: "MNP",
  type: "Sugestão",
  has_risk: false,
  risk_impact: null,
  start_date: null,
  end_date: null,
  duration_days: 0,
  completion_pct: 0,
  is_milestone: false,
  notes: null,
  status: "Not Started",
};

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  streams: Stream[];
  task: Task | null;
  onSave: (data: TaskFormData) => void;
}

function taskToForm(task: Task): TaskFormData {
  return {
    id: task.id,
    stream_id: task.stream_id,
    name: task.name,
    owner: task.owner,
    type: task.type,
    has_risk: task.has_risk,
    risk_impact: task.risk_impact,
    start_date: task.start_date,
    end_date: task.end_date,
    duration_days: task.duration_days,
    completion_pct: task.completion_pct,
    is_milestone: task.is_milestone,
    notes: task.notes,
    status: task.status,
  };
}

export function TaskDialog({
  open,
  onOpenChange,
  streams,
  task,
  onSave,
}: TaskDialogProps) {
  const isEditing = !!task;
  const [form, setForm] = useState<TaskFormData>(
    task ? taskToForm(task) : emptyForm
  );

  // Reset form when dialog opens with different task
  const [prevTask, setPrevTask] = useState<Task | null>(task);
  if (task !== prevTask) {
    setPrevTask(task);
    setForm(task ? taskToForm(task) : emptyForm);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.id.trim() || !form.name.trim()) return;
    onSave(form);
    onOpenChange(false);
  }

  const set = <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="task-id" className="text-xs">
                ID
              </Label>
              <Input
                id="task-id"
                value={form.id}
                onChange={(e) => set("id", e.target.value)}
                placeholder="Ex: 1.8"
                disabled={isEditing}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-stream" className="text-xs">
                Stream
              </Label>
              <Select
                value={String(form.stream_id)}
                onValueChange={(v: string | null) => {
                  if (v) set("stream_id", Number(v));
                }}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {streams.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-name" className="text-xs">
              Nome
            </Label>
            <Input
              id="task-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Descrição da tarefa"
              className="h-8 text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="task-owner" className="text-xs">
                Owner
              </Label>
              <Select
                value={form.owner}
                onValueChange={(v: string | null) => {
                  if (v) set("owner", v);
                }}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["MNP", "Cliente", "Cliente/MNP", "Interno"].map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-type" className="text-xs">
                Tipo
              </Label>
              <Select
                value={form.type}
                onValueChange={(v: string | null) => {
                  if (v) set("type", v as Task["type"]);
                }}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Sugestão", "Desafio", "Opinião"] as const).map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-status" className="text-xs">
                Estado
              </Label>
              <Select
                value={form.status}
                onValueChange={(v: string | null) => {
                  if (v) set("status", v as Task["status"]);
                }}
              >
                <SelectTrigger className="h-8 text-sm">
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
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="task-start" className="text-xs">
                Início
              </Label>
              <Input
                id="task-start"
                type="date"
                value={form.start_date ?? ""}
                onChange={(e) => set("start_date", e.target.value || null)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-end" className="text-xs">
                Fim
              </Label>
              <Input
                id="task-end"
                type="date"
                value={form.end_date ?? ""}
                onChange={(e) => set("end_date", e.target.value || null)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-pct" className="text-xs">
                Conclusão (%)
              </Label>
              <Input
                id="task-pct"
                type="number"
                min={0}
                max={100}
                value={form.completion_pct}
                onChange={(e) =>
                  set(
                    "completion_pct",
                    Math.min(100, Math.max(0, Number(e.target.value)))
                  )
                }
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="task-risk" className="text-xs">
                Risco
              </Label>
              <Select
                value={form.has_risk ? "yes" : "no"}
                onValueChange={(v: string | null) => {
                  if (v) set("has_risk", v === "yes");
                }}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Sem risco</SelectItem>
                  <SelectItem value="yes">Com risco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.has_risk && (
              <div className="space-y-1.5">
                <Label htmlFor="task-risk-impact" className="text-xs">
                  Impacto
                </Label>
                <Input
                  id="task-risk-impact"
                  value={form.risk_impact ?? ""}
                  onChange={(e) => set("risk_impact", e.target.value || null)}
                  placeholder="Financeiro, Operacional..."
                  className="h-8 text-sm"
                />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-notes" className="text-xs">
              Notas
            </Label>
            <Input
              id="task-notes"
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value || null)}
              placeholder="Notas adicionais..."
              className="h-8 text-sm"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm">
              {isEditing ? "Guardar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
