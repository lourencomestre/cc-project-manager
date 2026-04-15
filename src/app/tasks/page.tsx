"use client";

import { useState, useMemo } from "react";
import { useData } from "@/hooks/DataProvider";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskTable } from "@/components/tasks/TaskTable";
import { TaskDialog } from "@/components/tasks/TaskDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getTaskIndex } from "@/lib/utils";
import type { Task } from "@/lib/types";

export default function TasksPage() {
  const { streams, tasks, loading, updateTask, createTask, deleteTask } =
    useData();

  const [selectedStream, setSelectedStream] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOwner, setSelectedOwner] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (selectedStream !== "all" && task.stream_id !== Number(selectedStream))
        return false;
      if (selectedStatus !== "all" && task.status !== selectedStatus)
        return false;
      if (selectedOwner !== "all" && !task.owner.includes(selectedOwner))
        return false;
      if (selectedRisk === "yes" && !task.has_risk) return false;
      if (selectedRisk === "no" && task.has_risk) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const index = getTaskIndex(task, tasks, streams);
        if (
          !task.name.toLowerCase().includes(q) &&
          !index.includes(q)
        )
          return false;
      }
      return true;
    });
  }, [
    tasks,
    streams,
    selectedStream,
    selectedStatus,
    selectedOwner,
    selectedRisk,
    searchQuery,
  ]);

  function handleSave(data: Omit<Task, "id" | "position" | "created_at" | "updated_at">) {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      createTask(data);
    }
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setDialogOpen(true);
  }

  function handleNew() {
    setEditingTask(null);
    setDialogOpen(true);
  }

  if (loading) {
    return <Skeleton className="h-[600px]" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Tarefas</h1>
          <p className="text-sm text-muted-foreground">
            {filteredTasks.length} de {tasks.length} tarefas
          </p>
        </div>
        <Button size="sm" onClick={handleNew}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Nova Tarefa
        </Button>
      </div>
      <TaskFilters
        streams={streams}
        selectedStream={selectedStream}
        selectedStatus={selectedStatus}
        selectedOwner={selectedOwner}
        selectedRisk={selectedRisk}
        searchQuery={searchQuery}
        onStreamChange={(v) => setSelectedStream(v ?? "all")}
        onStatusChange={(v) => setSelectedStatus(v ?? "all")}
        onOwnerChange={(v) => setSelectedOwner(v ?? "all")}
        onRiskChange={(v) => setSelectedRisk(v ?? "all")}
        onSearchChange={setSearchQuery}
      />
      <TaskTable
        streams={streams}
        tasks={filteredTasks}
        allTasks={tasks}
        onUpdateTask={updateTask}
        onEditTask={handleEdit}
        onDeleteTask={deleteTask}
      />
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        streams={streams}
        task={editingTask}
        onSave={handleSave}
      />
    </div>
  );
}
