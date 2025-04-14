export interface Blank {
  id: number;
  correctAnswer: string;
}

export interface Question {
  id: number;
  sentence: string;
  blanks: Blank[];
  options: string[];
}

export interface UserBlankAnswer {
  blankId: number;
  userAnswer: string | null;
  correctAnswer: string;
}

export interface UserAnswer {
  questionId: number;
  blanks: UserBlankAnswer[];
}

// Sample questions data
export const questionsData: Question[] = [
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
