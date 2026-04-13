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
import type { Stream } from "@/lib/types";

const PRESET_COLORS = [
  "#3B82F6", "#EF4444", "#F59E0B", "#10B981", "#8B5CF6",
  "#06B6D4", "#F97316", "#EC4899", "#6366F1", "#14B8A6",
  "#A855F7", "#78716C", "#DC2626", "#059669", "#7C3AED",
];

interface StreamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stream: Stream | null;
  nextOrder: number;
  onSave: (data: Omit<Stream, "id">) => void;
}

function StreamDialogForm({
  stream,
  nextOrder,
  onSave,
  onClose,
}: {
  stream: Stream | null;
  nextOrder: number;
  onSave: (data: Omit<Stream, "id">) => void;
  onClose: () => void;
}) {
  const isEditing = !!stream;
  const [name, setName] = useState(stream?.name ?? "");
  const [color, setColor] = useState(stream?.color ?? "#3B82F6");
  const [order, setOrder] = useState(stream?.display_order ?? nextOrder);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), color, display_order: order });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="stream-name" className="text-xs">Nome</Label>
        <Input
          id="stream-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da stream"
          className="h-8 text-sm"
          autoFocus
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Cor</Label>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className="h-6 w-6 rounded-md border-2 transition-all"
              style={{
                backgroundColor: c,
                borderColor: color === c ? "var(--foreground)" : "transparent",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-12 cursor-pointer p-0.5"
          />
          <Input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-24 font-mono text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="stream-order" className="text-xs">Ordem</Label>
        <Input
          id="stream-order"
          type="number"
          min={1}
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="h-8 w-20 text-sm"
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" size="sm" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" size="sm">
          {isEditing ? "Guardar" : "Criar"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function StreamDialog({
  open,
  onOpenChange,
  stream,
  nextOrder,
  onSave,
}: StreamDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{stream ? "Editar Stream" : "Nova Stream"}</DialogTitle>
        </DialogHeader>
        {open && (
          <StreamDialogForm
            key={stream?.id ?? "new"}
            stream={stream}
            nextOrder={nextOrder}
            onSave={onSave}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
