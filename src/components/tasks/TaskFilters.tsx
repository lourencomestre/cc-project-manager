"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { STATUS_LABELS } from "@/lib/types";
import type { Stream, Task } from "@/lib/types";

interface TaskFiltersProps {
  streams: Stream[];
  selectedStream: string;
  selectedStatus: string;
  selectedOwner: string;
  selectedRisk: string;
  searchQuery: string;
  onStreamChange: (value: string | null) => void;
  onStatusChange: (value: string | null) => void;
  onOwnerChange: (value: string | null) => void;
  onRiskChange: (value: string | null) => void;
  onSearchChange: (value: string) => void;
}

const owners = ["Todos", "MNP", "Cliente", "Cliente/MNP", "Interno"];

export function TaskFilters({
  streams,
  selectedStream,
  selectedStatus,
  selectedOwner,
  selectedRisk,
  searchQuery,
  onStreamChange,
  onStatusChange,
  onOwnerChange,
  onRiskChange,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        placeholder="Pesquisar tarefas..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-8 w-48"
      />

      <Select value={selectedStream} onValueChange={onStreamChange}>
        <SelectTrigger className="h-8 w-44">
          <SelectValue placeholder="Stream" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as streams</SelectItem>
          {streams.map((s) => (
            <SelectItem key={s.id} value={String(s.id)}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="h-8 w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os estados</SelectItem>
          {(Object.entries(STATUS_LABELS) as [Task["status"], string][]).map(
            ([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>

      <Select value={selectedOwner} onValueChange={onOwnerChange}>
        <SelectTrigger className="h-8 w-36">
          <SelectValue placeholder="Owner" />
        </SelectTrigger>
        <SelectContent>
          {owners.map((o) => (
            <SelectItem key={o} value={o === "Todos" ? "all" : o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedRisk} onValueChange={onRiskChange}>
        <SelectTrigger className="h-8 w-32">
          <SelectValue placeholder="Risco" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="yes">Com risco</SelectItem>
          <SelectItem value="no">Sem risco</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
