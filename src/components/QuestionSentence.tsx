import React from "react";
import { Question } from "../data/questionsData";

interface QuestionSentenceProps {
  question: Question;
  filledBlanks: Record<number, string>;
  onBlankClick: (blankId: number) => void;
}

const QuestionSentence: React.FC<QuestionSentenceProps> = ({
  question,
  filledBlanks,
  onBlankClick,
}) => {
  // Split the sentence into parts based on the placeholder "____"
  const parts = question.sentence.split("____");

  return (
    <div className="mb-6 text-lg leading-relaxed">
      {parts.map((part, index) => (
        <span key={`part-${index}`}>
          {part}
          {index < question.blanks.length && (
            <span
              onClick={() => {
                const blankId = question.blanks[index].id;
                if (filledBlanks[blankId]) {
                  onBlankClick(blankId);
                }
              }}
              className={`mx-1 inline-block min-w-20 border-b-2 border-blue-500 px-2 text-center align-middle ${
                filledBlanks[question.blanks[index].id]
                  ? "cursor-pointer bg-blue-100 font-semibold text-blue-700"
                  : "bg-gray-100"
              }`}
              style={{ minHeight: "1.5em" }}
            >
              {filledBlanks[question.blanks[index].id] ||
                "\u00A0\u00A0\u00A0\u00A0"}{" "}
            </span>
          )}
        </span>
      ))}
    </div>
  );
};

export default QuestionSentence;
