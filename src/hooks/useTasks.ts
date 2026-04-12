"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { tasks as fallbackTasks } from "@/data/seed";
import type { Task } from "@/lib/types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .order("id");

        if (!cancelled) {
          setTasks(!error && data ? data : fallbackTasks);
        }
      } else if (!cancelled) {
        setTasks(fallbackTasks);
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateTask = useCallback(
    async (taskId: string, updates: Partial<Task>) => {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("tasks")
          .update(updates)
          .eq("id", taskId);

        if (!error) {
          setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
          );
          return true;
        }
        return false;
      } else {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
        );
        return true;
      }
    },
    []
  );

  const createTask = useCallback(async (task: Omit<Task, "created_at" | "updated_at">) => {
    const now = new Date().toISOString();
    const fullTask: Task = { ...task, created_at: now, updated_at: now };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("tasks").insert(fullTask);
      if (!error) {
        setTasks((prev) => [...prev, fullTask]);
        return true;
      }
      return false;
    } else {
      setTasks((prev) => [...prev, fullTask]);
      return true;
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (!error) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        return true;
      }
      return false;
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      return true;
    }
  }, []);

  return { tasks, loading, updateTask, createTask, deleteTask };
}
