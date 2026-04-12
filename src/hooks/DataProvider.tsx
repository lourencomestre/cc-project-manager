"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { streams as fallbackStreams, tasks as fallbackTasks, questions as fallbackQuestions } from "@/data/seed";
import type { Stream, Task, Question } from "@/lib/types";

interface DataContextValue {
  streams: Stream[];
  tasks: Task[];
  questions: Question[];
  loading: boolean;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<boolean>;
  createTask: (task: Omit<Task, "created_at" | "updated_at">) => Promise<boolean>;
  deleteTask: (taskId: string) => Promise<boolean>;
  updateQuestionStatus: (questionId: number, status: Question["status"]) => Promise<boolean>;
  createStream: (stream: Omit<Stream, "id">) => Promise<boolean>;
  updateStream: (streamId: number, updates: Partial<Stream>) => Promise<boolean>;
  deleteStream: (streamId: number) => Promise<boolean>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

function syncStatusAndCompletion(updates: Partial<Task>, current: Task): Partial<Task> {
  const merged = { ...updates };
  const newStatus = merged.status ?? current.status;

  if (newStatus === "Done") {
    merged.completion_pct = 100;
  }

  if (newStatus === "Not Started") {
    merged.completion_pct = 0;
  }

  if (merged.completion_pct === 100 && newStatus !== "Done") {
    merged.status = "Done";
  }

  return merged;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (isSupabaseConfigured && supabase) {
        const [streamsRes, tasksRes, questionsRes] = await Promise.all([
          supabase.from("streams").select("*").order("display_order"),
          supabase.from("tasks").select("*").order("id"),
          supabase.from("questions").select("*").order("id"),
        ]);

        if (!cancelled) {
          setStreams(streamsRes.data ?? fallbackStreams);
          setTasks(tasksRes.data ?? fallbackTasks);
          setQuestions(questionsRes.data ?? fallbackQuestions);
        }
      } else if (!cancelled) {
        setStreams(fallbackStreams);
        setTasks(fallbackTasks);
        setQuestions(fallbackQuestions);
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // --- Tasks ---

  const updateTask = useCallback(async (taskId: string, rawUpdates: Partial<Task>) => {
    const current = tasks.find((t) => t.id === taskId);
    if (!current) return false;

    const updates = syncStatusAndCompletion(rawUpdates, current);

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("tasks").update(updates).eq("id", taskId);
      if (error) return false;
    }

    return true;
  }, [tasks]);

  const createTask = useCallback(async (task: Omit<Task, "created_at" | "updated_at">) => {
    const now = new Date().toISOString();
    const fullTask: Task = { ...task, created_at: now, updated_at: now };

    setTasks((prev) => [...prev, fullTask]);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("tasks").insert(fullTask);
      if (error) return false;
    }

    return true;
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (error) return false;
    }

    return true;
  }, []);

  // --- Questions ---

  const updateQuestionStatus = useCallback(async (questionId: number, status: Question["status"]) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, status } : q))
    );

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("questions").update({ status }).eq("id", questionId);
      if (error) return false;
    }

    return true;
  }, []);

  // --- Streams ---

  const createStream = useCallback(async (stream: Omit<Stream, "id">) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("streams").insert(stream).select().single();
      if (error || !data) return false;
      setStreams((prev) => [...prev, data].sort((a, b) => a.display_order - b.display_order));
    } else {
      const newId = Math.max(0, ...streams.map((s) => s.id)) + 1;
      setStreams((prev) => [...prev, { ...stream, id: newId }].sort((a, b) => a.display_order - b.display_order));
    }

    return true;
  }, [streams]);

  const updateStream = useCallback(async (streamId: number, updates: Partial<Stream>) => {
    setStreams((prev) =>
      prev.map((s) => (s.id === streamId ? { ...s, ...updates } : s))
        .sort((a, b) => a.display_order - b.display_order)
    );

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("streams").update(updates).eq("id", streamId);
      if (error) return false;
    }

    return true;
  }, []);

  const deleteStream = useCallback(async (streamId: number) => {
    setStreams((prev) => prev.filter((s) => s.id !== streamId));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("streams").delete().eq("id", streamId);
      if (error) return false;
    }

    return true;
  }, []);

  return (
    <DataContext.Provider
      value={{
        streams,
        tasks,
        questions,
        loading,
        updateTask,
        createTask,
        deleteTask,
        updateQuestionStatus,
        createStream,
        updateStream,
        deleteStream,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
