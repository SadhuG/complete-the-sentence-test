import { Question, UserAnswer } from "../data/questionsData";

export const calculateScore = (
  questions: Question[],
  userAnswers: UserAnswer[],
  totalPossibleScore: number = 10,
): number => {
  let correctQuestions = 0;
  userAnswers.forEach((questionAnswer) => {
    // Find the matching question
    const questionData = questions.find(
      (q) => q.id === questionAnswer.questionId,
    );
    if (!questionData) return;

    // Check if all blanks for this question are correctly answered
    const allBlanksCorrect = questionAnswer.blanks.every(
      (blank) => blank.userAnswer === blank.correctAnswer,
    );
    if (allBlanksCorrect) {
      correctQuestions++;
    }
  });

  // Scale the score out of the totalPossibleScore
  return Math.round((correctQuestions / questions.length) * totalPossibleScore);
};
