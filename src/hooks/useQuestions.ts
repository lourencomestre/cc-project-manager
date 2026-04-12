"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { questions as fallbackQuestions } from "@/data/seed";
import type { Question } from "@/lib/types";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .order("id");

        if (!cancelled) {
          setQuestions(!error && data ? data : fallbackQuestions);
        }
      } else if (!cancelled) {
        setQuestions(fallbackQuestions);
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const updateQuestionStatus = useCallback(
    async (questionId: number, status: Question["status"]) => {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("questions")
          .update({ status })
          .eq("id", questionId);

        if (!error) {
          setQuestions((prev) =>
            prev.map((q) => (q.id === questionId ? { ...q, status } : q))
          );
          return true;
        }
        return false;
      } else {
        setQuestions((prev) =>
          prev.map((q) => (q.id === questionId ? { ...q, status } : q))
        );
        return true;
      }
    },
    []
  );

  return { questions, loading, updateQuestionStatus };
}
