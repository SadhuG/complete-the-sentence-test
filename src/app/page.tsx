"use client";

import React, { useState } from "react";
import Quiz from "../components/Quiz";
import QuizInstructions from "../components/QuizInstructions";

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-3xl">
        {!quizStarted ? (
          <QuizInstructions onStart={handleStartQuiz} />
        ) : (
          <Quiz />
        )}
      </div>
    </div>
  );
}
