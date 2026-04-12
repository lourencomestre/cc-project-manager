"use client";

import { useState } from "react";
import { useData } from "@/hooks/DataProvider";
import { StreamDialog } from "@/components/streams/StreamDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Stream } from "@/lib/types";

export default function StreamsPage() {
  const { streams, tasks, loading, createStream, updateStream, deleteStream } =
    useData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStream, setEditingStream] = useState<Stream | null>(null);

  function handleNew() {
    setEditingStream(null);
    setDialogOpen(true);
  }

  function handleEdit(stream: Stream) {
    setEditingStream(stream);
    setDialogOpen(true);
  }

  function handleSave(data: Omit<Stream, "id">) {
    if (editingStream) {
      updateStream(editingStream.id, data);
    } else {
      createStream(data);
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
            {streams.length} workstreams
          </p>
        </div>
        <Button size="sm" onClick={handleNew}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Nova Stream
        </Button>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead className="w-10">Cor</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="w-20 text-center">Tarefas</TableHead>
              <TableHead className="w-20 text-center">Ordem</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {streams.map((stream) => {
              const taskCount = tasks.filter(
                (t) => t.stream_id === stream.id
              ).length;
              return (
                <TableRow key={stream.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {stream.id}
                  </TableCell>
                  <TableCell>
                    <div
                      className="h-5 w-5 rounded-md"
                      style={{ backgroundColor: stream.color }}
                    />
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {stream.name}
                  </TableCell>
                  <TableCell className="text-center text-xs text-muted-foreground">
                    {taskCount}
                  </TableCell>
                  <TableCell className="text-center text-xs text-muted-foreground">
                    {stream.display_order}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted">
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
