"use client";
import { JSX, useCallback, useEffect, useState } from "react";

// Define types for our data structure (Keep these as they are)
interface Blank {
  id: number;
  correctAnswer: string;
}

interface Question {
  id: number;
  sentence: string;
  blanks: Blank[];
  options: string[];
}

interface UserBlankAnswer {
  blankId: number;
  userAnswer: string | null;
  correctAnswer: string;
}

interface UserAnswer {
  questionId: number;
  blanks: UserBlankAnswer[];
}

// --- MODIFIED questionsData from json file ---
const questionsData: Question[] = [
  {
    id: 1,
    sentence:
      "The company's ____ approach to product development ____ customer feedback at every stage, ____ user satisfaction and ____ a loyal consumer base.",
    blanks: [
      { id: 1, correctAnswer: "User-centric" },
      { id: 2, correctAnswer: "Incorporated" },
      { id: 3, correctAnswer: "Enhancing" },
      { id: 4, correctAnswer: "Cultivating" },
    ],
    options: ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
  },
  {
    id: 2,
    sentence:
      "The ____ musical performance ____ elements from various genres, ____ the audience with its unique sound and ____ critical acclaim from industry experts.",
    blanks: [
      { id: 1, correctAnswer: "Eclectic" },
      { id: 2, correctAnswer: "Blended" },
      { id: 3, correctAnswer: "Captivating" },
      { id: 4, correctAnswer: "Garnering" },
    ],
    options: ["Captivating", "Eclectic", "Garnering", "Blended"],
  },
  {
    id: 3,
    sentence:
      "The scientist's ____ research on quantum computing ____ new possibilities for data processing, ____ traditional limitations and ____ the way for groundbreaking technological advancements.",
    blanks: [
      { id: 1, correctAnswer: "Pioneering" },
      { id: 2, correctAnswer: "Opened up" },
      { id: 3, correctAnswer: "Overcoming" },
      { id: 4, correctAnswer: "Paving" },
    ],
    options: ["Pioneering", "Paving", "Overcoming", "Opened up"],
  },
  {
    id: 4,
    sentence:
      "The ____ implementation of machine learning algorithms in medical diagnostics ____ early detection of diseases, ____ treatment outcomes and ____ the workload of healthcare professionals.",
    blanks: [
      { id: 1, correctAnswer: "Revolutionary" },
      { id: 2, correctAnswer: "Enabled" },
      { id: 3, correctAnswer: "Improving" },
      { id: 4, correctAnswer: "Reducing" },
    ],
    options: ["Improving", "Reducing", "Enabled", "Revolutionary"],
  },
  {
    id: 5,
    sentence:
      "The ____ security breach at the tech giant ____ millions of users' data, ____ concerns about online privacy and ____ calls for stricter regulations.",
    blanks: [
      { id: 1, correctAnswer: "Massive" },
      { id: 2, correctAnswer: "Compromised" },
      { id: 3, correctAnswer: "Raising" },
      { id: 4, correctAnswer: "Prompting" },
    ],
    options: ["Raising", "Massive", "Prompting", "Compromised"],
  },
  {
    id: 6,
    sentence:
      "The ____ educational reform ____ a more inclusive curriculum, ____ equal opportunities for all students and ____ the overall quality of public schooling.",
    blanks: [
      { id: 1, correctAnswer: "Comprehensive" },
      { id: 2, correctAnswer: "Implemented" },
      { id: 3, correctAnswer: "Promoting" },
      { id: 4, correctAnswer: "Enhancing" },
    ],
    options: ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
  },
  {
    id: 7,
    sentence:
      "The company's ____ commitment to sustainability ____ eco-friendly practices across all departments, ____ its carbon footprint and ____ a model for corporate responsibility.",
    blanks: [
      { id: 1, correctAnswer: "Unwavering" },
      { id: 2, correctAnswer: "Implemented" },
      { id: 3, correctAnswer: "Reducing" },
      { id: 4, correctAnswer: "Setting" },
    ],
    options: ["Implemented", "Setting", "Unwavering", "Reducing"],
  },
  {
    id: 8,
    sentence:
      "The ____ implementation of artificial intelligence in healthcare ____ patient outcomes, ____ the workload of medical professionals and ____ new avenues for personalized treatment.",
    blanks: [
      { id: 1, correctAnswer: "Gradual" },
      { id: 2, correctAnswer: "Improved" },
      { id: 3, correctAnswer: "Reducing" },
      { id: 4, correctAnswer: "Opening" },
    ],
    options: ["Opening", "Improved", "Gradual", "Reducing"],
  },
  {
    id: 9,
    sentence:
      "The ____ festival ____ artists from diverse backgrounds, ____ cultural exchange and ____ a platform for emerging talents to showcase their work.",
    blanks: [
      { id: 1, correctAnswer: "International" },
      { id: 2, correctAnswer: "Brought together" },
      { id: 3, correctAnswer: "Promoting" },
      { id: 4, correctAnswer: "Providing" },
    ],
    options: ["Providing", "Brought together", "Promoting", "International"],
  },
  {
    id: 10,
    sentence:
      "The ____ implementation of smart city technologies ____ urban efficiency and sustainability, ____ quality of life for residents and ____ a model for future urban development.",
    blanks: [
      { id: 1, correctAnswer: "Widespread" },
      { id: 2, correctAnswer: "Improved" },
      { id: 3, correctAnswer: "Enhancing" },
      { id: 4, correctAnswer: "Providing" },
    ],
    options: ["Enhancing", "Improved", "Providing", "Widespread"],
  },
];

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [filledBlanks, setFilledBlanks] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(30); // You might adjust timer based on difficulty
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  // Handle going to next question - Wrap in useCallback
  const handleNextQuestion = useCallback(() => {
    // Save current answers to the userAnswers array
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return; // Guard if no current question

    const updatedAnswers = userAnswers.map((answer, index) => {
      if (index === currentQuestionIndex) {
        return {
          ...answer,
          blanks: answer.blanks.map((blank) => ({
            ...blank,
            // Use the filledBlanks state for the *current* question
            userAnswer: filledBlanks[blank.blankId] || null,
          })),
        };
      }
      return answer; // Return other answers unchanged
    });

    setUserAnswers(updatedAnswers);

    // Determine if we should go to next question or end quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setFilledBlanks({}); // Clear blanks for the new question
      setTimeLeft(30); // Reset timer
    } else {
      // Calculate score based on fully correct questions only
      const totalPossibleScore = 10; // Keep score out of 10
      let correctQuestions = 0;

      updatedAnswers.forEach((question) => {
        // Check if ALL blanks in this question were answered correctly
        const allBlanksCorrect = question.blanks.every(
          (blank) => blank.userAnswer === blank.correctAnswer,
        );

        if (allBlanksCorrect) {
          correctQuestions++;
        }
      });

      // Calculate score as a proportion of correctly answered questions
      const scaledScore = Math.round(
        (correctQuestions / questions.length) * totalPossibleScore,
      );

      setScore(scaledScore);
      setQuizCompleted(true);
      setFilledBlanks({}); // Also clear blanks when quiz completes
    }
    // Add dependencies for useCallback
  }, [currentQuestionIndex, questions, userAnswers, filledBlanks]);

  // Initialize answers array on component mount
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
    // Reset filled blanks when questions data changes (e.g., if loaded async)
    setFilledBlanks({});
  }, [questions]); // Dependency array includes questions

  // Timer effect (Keep as is)
  // Timer effect with proper timeout handling
  useEffect(() => {
    if (!quizStarted || quizCompleted) return;

    if (timeLeft <= 0) {
      // When time runs out, we need to capture the current state of answers
      // before moving to the next question, even if no blanks were filled
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        // Update userAnswers with the current state (even if blank)
        setUserAnswers((prev) => {
          const updated = [...prev];
          const currentAnswers = updated[currentQuestionIndex];

          if (currentAnswers) {
            currentAnswers.blanks = currentAnswers.blanks.map((blank) => ({
              ...blank,
              userAnswer: filledBlanks[blank.blankId] || null,
            }));
          }

          return updated;
        });
      }

      // Now proceed to the next question
      handleNextQuestion();
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [
    timeLeft,
    quizCompleted,
    quizStarted,
    currentQuestionIndex,
    questions,
    handleNextQuestion,
    filledBlanks,
  ]);

  // Check if all blanks are filled (Keep as is)
  const allBlanksFilled = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;

    const blankCount = currentQuestion.blanks.length;
    // Ensure filledBlanks actually contains entries for the current question's blanks
    const filledCount = currentQuestion.blanks.filter(
      (blank) => filledBlanks[blank.id] !== undefined,
    ).length;

    return blankCount === filledCount;
  }, [currentQuestionIndex, questions, filledBlanks]);

  // Start the quiz (Keep as is)
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0); // Ensure starting from the first question
    setFilledBlanks({}); // Clear any previous state
    setQuizCompleted(false); // Ensure quiz is not completed
    setScore(0); // Reset score
    setTimeLeft(30); // Reset timer for the first question
    // Re-initialize userAnswers based on current questionsData
    const initialAnswers: UserAnswer[] = questions.map((q) => ({
      questionId: q.id,
      blanks: q.blanks.map((blank) => ({
        blankId: blank.id,
        userAnswer: null,
        correctAnswer: blank.correctAnswer,
      })),
    }));
    setUserAnswers(initialAnswers);
  };

  // Handle word selection (Keep as is - logic adapts)
  const handleWordSelect = (word: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return; // Guard clause

    const blankIds = currentQuestion.blanks.map((b) => b.id);

    // Find the first blank ID that hasn't been filled yet
    const emptyBlankId = blankIds.find((id) => !filledBlanks[id]);

    if (emptyBlankId !== undefined) {
      // Check if an empty blank was found
      setFilledBlanks((prev) => ({
        ...prev,
        [emptyBlankId]: word,
      }));
    }
  };

  // Handle removing word from blank (Keep as is)
  const handleRemoveWord = (blankId: number) => {
    setFilledBlanks((prev) => {
      const updated = { ...prev };
      delete updated[blankId];
      return updated;
    });
  };

  // Check if a word option is currently used in any blank (Keep as is)
  const isWordUsed = (word: string) => {
    // Important: Only check against the *current* question's blanks
    // This prevents issues if the same word exists in options/answers of other questions
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;

    const currentBlankIds = currentQuestion.blanks.map((b) => b.id);
    const filledValuesInCurrentQuestion = Object.entries(filledBlanks)
      .filter(([key]) => currentBlankIds.includes(Number(key)))
      .map(([, value]) => value);

    return filledValuesInCurrentQuestion.includes(word);
  };

  // Render the sentence with blanks (Keep as is - logic adapts)
  const renderSentenceWithBlanks = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    // Split sentence by the placeholder '____'
    const parts = currentQuestion.sentence.split("____");

    // We expect parts.length to be blanks.length + 1
    // Example: "A ____ B ____ C" -> parts = ["A ", " B ", " C"], blanks = 2

    return (
      <div className="mb-6 text-lg leading-relaxed">
        {" "}
        {/* Added leading-relaxed for better spacing */}
        {parts.map((part, index) => (
          <span key={`part-${index}`}>
            {part}
            {index < currentQuestion.blanks.length && ( // Only render a blank if there's a corresponding blank object
              <span
                onClick={() => {
                  const blankId = currentQuestion.blanks[index].id;
                  if (filledBlanks[blankId]) {
                    handleRemoveWord(blankId);
                  }
                }}
                className={`mx-1 inline-block min-w-20 border-b-2 border-blue-500 px-2 text-center align-middle ${
                  // Adjusted min-width and added padding
                  filledBlanks[currentQuestion.blanks[index].id]
                    ? "cursor-pointer bg-blue-100 font-semibold text-blue-700" // Style filled blanks
                    : "bg-gray-100" // Style empty blanks slightly
                }`}
                style={{ minHeight: "1.5em" }} // Ensure consistent height
              >
                {filledBlanks[currentQuestion.blanks[index].id] ||
                  "\u00A0\u00A0\u00A0\u00A0"}{" "}
                {/* Non-breaking spaces for empty */}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  // Reset the entire quiz (Enhanced to re-initialize answers)
  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setFilledBlanks({});
    setTimeLeft(30);
    setScore(0); // Reset score explicitly

    // Re-initialize user answers to clear previous attempts
    const initialAnswers: UserAnswer[] = questions.map((q) => ({
      questionId: q.id,
      blanks: q.blanks.map((blank) => ({
        blankId: blank.id,
        userAnswer: null,
        correctAnswer: blank.correctAnswer,
      })),
    }));
    setUserAnswers(initialAnswers);
  };

  // --- JSX Rendering ---

  // Welcome screen (Keep as is)
  if (!quizStarted) {
    return (
      <div className="mx-auto max-w-2xl rounded bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
          Fill in the Blanks Quiz
        </h1>
        <div className="mb-8 rounded-lg bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-semibold">Quiz Rules:</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              You'll be presented with sentences containing 4 blank spaces.
            </li>
            <li>
              Select the correct word from the 4 given options to fill each
              blank.
            </li>
            <li>
              Words are placed in the blanks in order (first click fills first
              blank, etc.).
            </li>
            <li>
              You can unselect a word by clicking on the filled blank it
              occupies.
            </li>
            <li>You have 30 seconds to answer each question.</li>
            <li>
              The quiz will automatically move to the next question when time
              runs out or you submit.
            </li>
            <li>
              You can only proceed to the next question when all 4 blanks are
              filled.
            </li>
            <li>At the end, you'll see your score and review your answers.</li>
          </ul>
        </div>
        <div className="text-center">
          <button
            onClick={handleStartQuiz}
            className="rounded-lg bg-blue-500 px-12 py-3 text-lg font-medium text-white shadow-md transition-colors hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Results screen (Updated with enhanced background colors)
  if (quizCompleted) {
    return (
      <div className="mx-auto max-w-2xl rounded bg-white p-6 shadow-lg">
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
          {userAnswers.map((question, qIndex) => {
            // Find the original question data
            const questionData = questions[qIndex];
            if (!questionData) return null;

            // Check if any blanks were answered at all
            const anyBlanksAnswered = question.blanks.some(
              (blank) => blank.userAnswer !== null,
            );

            // Check if all blanks in this question were answered correctly
            const allBlanksCorrect = question.blanks.every(
              (blank) => blank.userAnswer === blank.correctAnswer,
            );

            // Check if all blanks were answered (no unanswered blanks)
            const allBlanksAnswered = question.blanks.every(
              (blank) => blank.userAnswer !== null,
            );

            // Determine question status
            let questionStatus;
            let statusClass;
            let bgClass;
            let borderClass;

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
                key={question.questionId}
                className={`rounded-lg border p-4 shadow-sm ${bgClass} ${borderClass}`}
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

                <div className="mb-2 text-gray-700">
                  {questionData.sentence}
                </div>

                <div className="mt-3 space-y-2 border-t pt-2">
                  {question.blanks.map((blank) => {
                    const userAns = blank.userAnswer;

                    // Determine the state for this blank
                    let textColorClass;
                    let displayAnswer;
                    let showCorrectAnswer = false;

                    if (userAns === null) {
                      textColorClass = "text-amber-600";
                      displayAnswer = "(not answered)";
                      showCorrectAnswer = true;
                    } else if (userAns === blank.correctAnswer) {
                      textColorClass = "text-green-600";
                      displayAnswer = userAns;
                      showCorrectAnswer = false;
                    } else {
                      textColorClass = "text-red-600";
                      displayAnswer = userAns;
                      showCorrectAnswer = true;
                    }

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
            onClick={resetQuiz}
            className="rounded-lg bg-blue-500 px-8 py-2 text-lg font-medium text-white transition-colors hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main quiz view
  const currentQuestion = questions[currentQuestionIndex]; // Get current question data
  if (!currentQuestion) {
    // Handle case where currentQuestionIndex might be out of bounds (should not happen with proper logic)
    return <div className="p-8 text-center">Loading question or error...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-xl sm:p-8">
      {" "}
      {/* Increased max-width and padding */}
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-700">Fill in the Blanks</h1>
        <div className="text-lg font-bold">
          <span
            className={`rounded px-3 py-1 ${timeLeft <= 10 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
          >
            Time: {timeLeft}s
          </span>
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-4 text-right text-sm text-gray-500">
          {" "}
          {/* Moved progress indicator */}
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        {renderSentenceWithBlanks()} {/* Renders the sentence with blanks */}
        {/* Options Grid - Adjusted for potentially 4 options */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {" "}
          {/* Responsive grid */}
          {currentQuestion.options.map((option) => {
            const isUsed = isWordUsed(option);
            return (
              <button
                key={option}
                onClick={() => handleWordSelect(option)}
                disabled={isUsed}
                className={`rounded-md px-4 py-2 text-center transition-colors duration-150 ${
                  isUsed
                    ? "cursor-not-allowed bg-gray-300 text-gray-500 opacity-70"
                    : "border border-gray-300 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center">
        <button
          onClick={handleNextQuestion}
          disabled={!allBlanksFilled()} // Use the memoized callback
          className={`rounded-lg px-10 py-3 text-lg font-medium transition-colors duration-200 ${
            allBlanksFilled()
              ? "bg-blue-500 text-white shadow hover:bg-blue-600 hover:shadow-md"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
        >
          {currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "Finish Quiz"}{" "}
          {/* Dynamic button text */}
        </button>
      </div>
    </div>
  );
}
