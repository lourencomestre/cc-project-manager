"use client";

import { useStreams } from "@/hooks/useStreams";
import { useTasks } from "@/hooks/useTasks";
import { useQuestions } from "@/hooks/useQuestions";
import { QuestionsList } from "@/components/risks/QuestionsList";
import { RiskMatrix } from "@/components/risks/RiskMatrix";
import { Skeleton } from "@/components/ui/skeleton";

export default function RisksPage() {
  const { streams, loading: streamsLoading } = useStreams();
  const { tasks, loading: tasksLoading } = useTasks();
  const {
    questions,
    loading: questionsLoading,
    updateQuestionStatus,
  } = useQuestions();

  if (streamsLoading || tasksLoading || questionsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Riscos & Questões</h1>
        <p className="text-sm text-muted-foreground">
          Vista consolidada de riscos e questões em aberto
        </p>
      </div>
      <RiskMatrix streams={streams} tasks={tasks} />
      <QuestionsList
        streams={streams}
        questions={questions}
        onUpdateStatus={updateQuestionStatus}
      />
    </div>
  );
}
