"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import { ResultsView } from "@/components/ResultsView";

// This page intentionally stays a client-rendered, stateful flow rather than
// being split into separate /questionnaire and /results routes: the results
// are personalised and shouldn't be indexed by Google anyway, and keeping
// them in one component avoids having to pass answers between routes (via
// URL state or sessionStorage) for no real SEO benefit.
export default function QuestionnairePage() {
  const router = useRouter();
  const [stage, setStage] = useState("questionnaire"); // "questionnaire" | "results"
  const [answers, setAnswers] = useState({});
  const [editEntryStep, setEditEntryStep] = useState(0);

  const editAnswers = () => { setEditEntryStep(0); setStage("questionnaire"); };
  const finishQuestionnaire = () => setStage("results");
  const restart = () => { setAnswers({}); router.push("/"); };
  const cancelToHome = () => router.push("/");

  if (stage === "questionnaire") {
    return (
      <QuestionnaireForm
        answers={answers}
        setAnswers={setAnswers}
        startStep={editEntryStep}
        onFinish={finishQuestionnaire}
        onCancel={cancelToHome}
      />
    );
  }

  return <ResultsView answers={answers} onEdit={editAnswers} onRestart={restart} />;
}
