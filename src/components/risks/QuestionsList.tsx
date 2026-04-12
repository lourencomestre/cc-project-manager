"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QUESTION_STATUS_OPTIONS } from "@/lib/types";
import type { Stream, Question } from "@/lib/types";

interface QuestionsListProps {
  streams: Stream[];
  questions: Question[];
  onUpdateStatus: (questionId: number, status: Question["status"]) => void;
}

export function QuestionsList({
  streams,
  questions,
  onUpdateStatus,
}: QuestionsListProps) {
  const grouped = streams
    .map((stream) => ({
      stream,
      questions: questions.filter((q) => q.stream_id === stream.id),
    }))
    .filter((g) => g.questions.length > 0);

  const openCount = questions.filter((q) => q.status === "Aberta").length;
  const discussionCount = questions.filter(
    (q) => q.status === "Em Discussão"
  ).length;
  const resolvedCount = questions.filter(
    (q) => q.status === "Resolvida"
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base">Questões em Aberto</span>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {openCount} abertas
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {discussionCount} em discussão
            </Badge>
            <Badge variant="default" className="text-xs">
              {resolvedCount} resolvidas
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {grouped.map(({ stream, questions: streamQuestions }) => (
          <div key={stream.id}>
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: stream.color }}
              />
              <h3 className="text-sm font-semibold">{stream.name}</h3>
            </div>
            <div className="space-y-2 pl-5">
              {streamQuestions.map((question) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-border p-2"
                >
                  <p className="flex-1 text-sm">{question.text}</p>
                  <Select
                    value={question.status}
                    onValueChange={(value: string | null) => {
                      if (value) onUpdateStatus(question.id, value as Question["status"]);
                    }}
                  >
                    <SelectTrigger className="h-7 w-36 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {QUESTION_STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
