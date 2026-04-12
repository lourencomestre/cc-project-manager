export interface Stream {
  id: number;
  name: string;
  color: string;
  display_order: number;
}

export interface Task {
  id: string;
  stream_id: number;
  name: string;
  owner: string;
  type: "Sugestão" | "Desafio" | "Opinião";
  has_risk: boolean;
  risk_impact: string | null;
  start_date: string | null;
  end_date: string | null;
  duration_days: number;
  completion_pct: number;
  is_milestone: boolean;
  notes: string | null;
  status: "Not Started" | "In Progress" | "Done" | "Blocked";
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  stream_id: number;
  text: string;
  status: "Aberta" | "Em Discussão" | "Resolvida";
  created_at: string;
}

export interface StreamWithTasks extends Stream {
  tasks: Task[];
  questions: Question[];
}

export const PROJECT_START = "2026-04-16";
export const PROJECT_END = "2026-06-30";
export const GO_LIVE_DATE = "2026-07-01";

export const STATUS_OPTIONS = [
  "Not Started",
  "In Progress",
  "Done",
  "Blocked",
] as const;

export const STATUS_LABELS: Record<Task["status"], string> = {
  "Not Started": "Por Iniciar",
  "In Progress": "Em Progresso",
  Done: "Concluído",
  Blocked: "Bloqueado",
};

export const QUESTION_STATUS_OPTIONS = [
  "Aberta",
  "Em Discussão",
  "Resolvida",
] as const;
