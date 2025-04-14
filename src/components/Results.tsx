import React from "react";
import { Question, UserAnswer } from "../data/questionsData";

interface ResultsProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  score: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({
  questions,
  userAnswers,
  score,
  onRestart,
}) => {
  return (
    <div className="mx-auto w-full rounded-xl bg-white p-6 shadow-xl transition-all duration-300 sm:p-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-700">
        Quiz Results
      </h1>
      <div className="mb-8 text-center">
        <p className="text-4xl font-semibold text-blue-600">
          {score} <span className="text-2xl text-gray-600">/ 10</span>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          (Questions are only counted as correct if all 4 blanks are filled
          correctly)
        </p>
      </div>

      <div className="space-y-6">
        {userAnswers.map((questionAnswer, qIndex) => {
          const questionData = questions[qIndex];
          if (!questionData) return null;

          const anyBlanksAnswered = questionAnswer.blanks.some(
            (blank) => blank.userAnswer !== null,
          );
          const allBlanksCorrect = questionAnswer.blanks.every(
            (blank) => blank.userAnswer === blank.correctAnswer,
          );
          const allBlanksAnswered = questionAnswer.blanks.every(
            (blank) => blank.userAnswer !== null,
          );

          let questionStatus: string;
          let statusClass: string;
          let bgClass: string;
          let borderClass: string;

          if (!anyBlanksAnswered) {
            questionStatus = "Not Answered";
            statusClass = "bg-amber-100 text-amber-800";
            bgClass = "bg-amber-50";
            borderClass = "border-amber-200";
          } else if (allBlanksCorrect) {
            questionStatus = "Correct";
            statusClass = "bg-green-100 text-green-800";
            bgClass = "bg-green-50";
            borderClass = "border-green-300";
          } else if (!allBlanksAnswered) {
            questionStatus = "Incomplete";
            statusClass = "bg-amber-100 text-amber-800";
            bgClass = "bg-amber-50";
            borderClass = "border-amber-200";
          } else {
            questionStatus = "Incorrect";
            statusClass = "bg-red-100 text-red-800";
            bgClass = "bg-red-50";
            borderClass = "border-red-200";
          }

          return (
            <div
              key={questionAnswer.questionId}
              className={`rounded-lg border p-5 shadow-sm transition-all duration-200 ${bgClass} ${borderClass}`}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Question {qIndex + 1}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${statusClass}`}
                >
                  {questionStatus}
                </span>
              </div>

              <div className="mb-4 text-gray-700">{questionData.sentence}</div>

              <div className="mt-4 space-y-2 border-t pt-3">
                {questionAnswer.blanks.map((blank) => {
                  const userAns = blank.userAnswer;
                  const textColorClass =
                    userAns === null
                      ? "text-amber-600"
                      : userAns === blank.correctAnswer
                        ? "text-green-600"
                        : "text-red-600";
                  const displayAnswer = userAns || "(not answered)";
                  const showCorrectAnswer = userAns !== blank.correctAnswer;
                  return (
                    <div
                      key={blank.blankId}
                      className="flex items-center text-sm"
                    >
                      <span className="mr-2 text-gray-600">
                        Blank {blank.blankId}:
                      </span>
                      <span className={`font-medium ${textColorClass}`}>
                        {displayAnswer}
                      </span>
                      {showCorrectAnswer && (
                        <span className="ml-2 text-green-600">
                          (Correct: {blank.correctAnswer})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onRestart}
          className="rounded-lg bg-blue-600 px-10 py-3 text-lg font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;
