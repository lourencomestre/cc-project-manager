"use client";

import { useState, useRef } from "react";
import { useData } from "@/hooks/DataProvider";
import { StreamDialog } from "@/components/streams/StreamDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stream } from "@/lib/types";

export default function StreamsPage() {
  const { streams, tasks, loading, createStream, updateStream, deleteStream } =
    useData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStream, setEditingStream] = useState<Stream | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);

  function handleNew() {
    setEditingStream(null);
    setDialogOpen(true);
  }

  function handleEdit(stream: Stream) {
    setEditingStream(stream);
    setDialogOpen(true);
  }

  async function handleSave(data: Omit<Stream, "id">) {
    if (editingStream) {
      const ok = await updateStream(editingStream.id, data);
      if (!ok) alert("Erro ao atualizar stream.");
    } else {
      const ok = await createStream(data);
      if (!ok) alert("Erro ao criar stream. Verifica a consola.");
    }
  }

  function handleDelete(streamId: number) {
    const taskCount = tasks.filter((t) => t.stream_id === streamId).length;
    if (taskCount > 0) {
      alert(`Esta stream tem ${taskCount} tarefa(s). Remove as tarefas primeiro.`);
      return;
    }
    deleteStream(streamId);
  }

  function handleDragStart(streamId: number) {
    dragItemId.current = streamId;
  }

  function handleDragOver(e: React.DragEvent, streamId: number) {
    e.preventDefault();
    if (dragItemId.current !== streamId) {
      setDragOverId(streamId);
    }
  }

  function handleDrop(targetId: number) {
    const sourceId = dragItemId.current;
    if (!sourceId || sourceId === targetId) {
      setDragOverId(null);
      dragItemId.current = null;
      return;
    }

    const ordered = [...streams];
    const sourceIdx = ordered.findIndex((s) => s.id === sourceId);
    const targetIdx = ordered.findIndex((s) => s.id === targetId);
    if (sourceIdx === -1 || targetIdx === -1) return;

    const [moved] = ordered.splice(sourceIdx, 1);
    ordered.splice(targetIdx, 0, moved);

    ordered.forEach((s, i) => {
      const newOrder = i + 1;
      if (s.display_order !== newOrder) {
        updateStream(s.id, { display_order: newOrder });
      }
    });

    setDragOverId(null);
    dragItemId.current = null;
  }

  function handleDragEnd() {
    setDragOverId(null);
    dragItemId.current = null;
  }

  if (loading) {
    return <Skeleton className="h-[400px]" />;
  }

  const nextOrder = Math.max(0, ...streams.map((s) => s.display_order)) + 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Streams</h1>
          <p className="text-sm text-muted-foreground">
            {streams.length} workstreams · arrasta para reordenar
          </p>
        </div>
        <Button size="sm" onClick={handleNew}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Nova Stream
        </Button>
      </div>

      <div className="rounded-lg border border-border divide-y divide-border">
        {streams.map((stream) => {
          const taskCount = tasks.filter(
            (t) => t.stream_id === stream.id
          ).length;
          return (
            <div
              key={stream.id}
              draggable
              onDragStart={() => handleDragStart(stream.id)}
              onDragOver={(e) => handleDragOver(e, stream.id)}
              onDrop={() => handleDrop(stream.id)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 transition-colors",
                dragOverId === stream.id && "bg-muted"
              )}
            >
              <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground/50 active:cursor-grabbing" />
              <div
                className="h-4 w-4 shrink-0 rounded"
                style={{ backgroundColor: stream.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{stream.name}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {taskCount} tarefa{taskCount !== 1 ? "s" : ""}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-muted">
                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(stream)}>
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(stream.id)}
                  >
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>

      <StreamDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        stream={editingStream}
        nextOrder={nextOrder}
        onSave={handleSave}
      />
    </div>
  );
}
