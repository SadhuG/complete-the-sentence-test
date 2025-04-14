import React from "react";
import { Question } from "../data/questionsData";

interface OptionsButtonsProps {
  question: Question;
  isWordUsed: (word: string) => boolean;
  onSelectWord: (word: string) => void;
}

const OptionsButtons: React.FC<OptionsButtonsProps> = ({
  question,
  isWordUsed,
  onSelectWord,
}) => {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {question.options.map((option) => {
        const disabled = isWordUsed(option);
        return (
          <button
            key={option}
            onClick={() => onSelectWord(option)}
            disabled={disabled}
            className={`rounded-lg px-4 py-3 text-center font-medium transition-all duration-200 ${
              disabled
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "border border-gray-300 bg-white shadow hover:bg-blue-50 hover:shadow-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default OptionsButtons;
