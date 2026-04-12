"use client";

import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { streams as fallbackStreams } from "@/data/seed";
import type { Stream } from "@/lib/types";

export function useStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("streams")
          .select("*")
          .order("display_order");

        if (!cancelled) {
          setStreams(!error && data ? data : fallbackStreams);
        }
      } else if (!cancelled) {
        setStreams(fallbackStreams);
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { streams, loading };
}
