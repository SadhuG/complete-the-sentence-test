"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Question, questionsData, UserAnswer } from "../data/questionsData";
import { calculateScore } from "../utils/scoreUtils";
import OptionsButtons from "./OptionsButtons";
import QuestionSentence from "./QuestionSentence";
import Results from "./Results";
import Timer from "./Timer";

const Quiz: React.FC = () => {
  const [questions] = useState<Question[]>(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [filledBlanks, setFilledBlanks] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Initialize answers on component mount or when questions change
  useEffect(() => {
    const initialAnswers: UserAnswer[] = questions.map((q) => ({
      questionId: q.id,
      blanks: q.blanks.map((blank) => ({
        blankId: blank.id,
        userAnswer: null,
        correctAnswer: blank.correctAnswer,
      })),
    }));
    setUserAnswers(initialAnswers);
    setFilledBlanks({});
  }, [questions]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Check if all blanks in the current question are filled
  const allBlanksFilled = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;
    const blankCount = currentQuestion.blanks.length;
    const filledCount = currentQuestion.blanks.filter(
      (blank) => filledBlanks[blank.id] !== undefined,
    ).length;
    return blankCount === filledCount;
  }, [currentQuestionIndex, questions, filledBlanks]);

  // Check if a word option is already used in the current question
  const isWordUsed = (word: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;
    const currentBlankIds = currentQuestion.blanks.map((b) => b.id);
    const usedWords = Object.entries(filledBlanks)
      .filter(([key]) => currentBlankIds.includes(Number(key)))
      .map(([, value]) => value);
    return usedWords.includes(word);
  };

  // Handle word option selection to fill the blank
  const handleWordSelect = (word: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
    const blankIds = currentQuestion.blanks.map((b) => b.id);
    const emptyBlankId = blankIds.find((id) => !filledBlanks[id]);
    if (emptyBlankId !== undefined) {
      setFilledBlanks((prev) => ({ ...prev, [emptyBlankId]: word }));
    }
  };

  // Remove a word from a blank when the blank is clicked
  const handleRemoveWord = (blankId: number) => {
    setFilledBlanks((prev) => {
      const updated = { ...prev };
      delete updated[blankId];
      return updated;
    });
  };

  // Move to the next question or finish the quiz
  const handleNextQuestion = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    // Save current answers to userAnswers array
    const updatedAnswers = userAnswers.map((answer, index) => {
      if (index === currentQuestionIndex) {
        return {
          ...answer,
          blanks: answer.blanks.map((blank) => ({
            ...blank,
            userAnswer: filledBlanks[blank.blankId] || null,
          })),
        };
      }
      return answer;
    });
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setFilledBlanks({});
      setTimeLeft(30);
    } else {
      const scaledScore = calculateScore(questions, updatedAnswers);
      setScore(scaledScore);
      setQuizCompleted(true);
      setFilledBlanks({});
    }
  }, [currentQuestionIndex, questions, userAnswers, filledBlanks]);

  // Reset the quiz state for a restart
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setFilledBlanks({});
    setTimeLeft(30);
    setScore(0);
    setQuizCompleted(false);
    const initialAnswers = questions.map((q) => ({
      questionId: q.id,
      blanks: q.blanks.map((blank) => ({
        blankId: blank.id,
        userAnswer: null,
        correctAnswer: blank.correctAnswer,
      })),
    }));
    setUserAnswers(initialAnswers);
  };

  if (quizCompleted) {
    return (
      <Results
        questions={questions}
        userAnswers={userAnswers}
        score={score}
        onRestart={resetQuiz}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mx-auto w-full rounded-xl bg-white p-6 shadow-xl transition-all duration-300 sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-700">Fill in the Blanks</h1>
        <Timer timeLeft={timeLeft} />
      </div>
      <div className="mb-8">
        <div className="mb-4 text-right text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <QuestionSentence
          question={currentQuestion}
          filledBlanks={filledBlanks}
          onBlankClick={handleRemoveWord}
        />
        <OptionsButtons
          question={currentQuestion}
          isWordUsed={isWordUsed}
          onSelectWord={handleWordSelect}
        />
      </div>
      <div className="mt-8 border-t pt-6 text-center">
        <button
          onClick={handleNextQuestion}
          disabled={!allBlanksFilled()}
          className={`rounded-lg px-10 py-3 text-lg font-medium transition-all duration-200 ${
            allBlanksFilled()
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
        >
          {currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
