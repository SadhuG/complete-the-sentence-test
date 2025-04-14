import React from "react";

interface QuizInstructionsProps {
  onStart: () => void;
}

const QuizInstructions: React.FC<QuizInstructionsProps> = ({ onStart }) => {
  return (
    <div className="mx-auto w-full rounded-xl bg-white p-8 shadow-xl transition-all duration-300">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-700">
        Fill in the Blanks Quiz
      </h1>
      <div className="mb-8 rounded-xl bg-blue-50 p-6 shadow-inner">
        <h2 className="mb-4 text-xl font-semibold text-blue-800">
          Quiz Rules:
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-gray-700">
          <li>
            You&apos;ll be presented with sentences containing 4 blank spaces.
          </li>
          <li>
            Select the correct word from the 4 given options to fill each blank.
          </li>
          <li>
            Words are filled in order (first click fills the first blank, etc.).
          </li>
          <li>Click a filled blank to remove the word.</li>
          <li>You have 30 seconds per question.</li>
          <li>The quiz will move on when time runs out or you submit.</li>
          <li>You can proceed only when all 4 blanks are filled.</li>
          <li>
            At the end, you&apos;ll see your score and review your answers.
          </li>
        </ul>
      </div>
      <div className="text-center">
        <button
          onClick={onStart}
          className="rounded-lg bg-blue-600 px-12 py-3 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizInstructions;
