# Fill in the Blanks Quiz

A Next.js-based quiz application where users fill in the blanks in sentences by selecting the correct words from a given set of options. This project is structured into clearly defined directories for better scalability, maintainability, and reusability.

## Features

- **Interactive Quiz:** Users are presented with a sentence containing 4 blanks.
- **Dynamic Options:** Each question displays 4 selectable word options.
- **Timer:** 30-second timer for each quiz question.
- **Results Overview:** At the end, the user receives a detailed score and breakdown for each question.
- **Modular Architecture:** Clear separation of concerns using components, utilities, and data files.

## Deployment: [Live Link](https://complete-the-sentence-test-kuueo29eo-sudhanshs-projects.vercel.app/)

## Development

This project leverages Next.js and React's functional components along with hooks for state management. The codebase is split into clearly defined modules:

- **Components:** Modular components like `QuizInstructions`, `Quiz`, `Timer`, etc., allow for easy maintenance and reuse.
- **Data:** All quiz questions and type definitions are stored in `/data/questionsData.ts`.
- **Utilities:** Helper functions are located in `/utils/scoreUtils.ts` to separate business logic (e.g., calculating the score) from UI components.
- **Pages:** The Next.js `/pages` directory contains the main entry point to the application.

Feel free to adjust styles, add tests, or extend quiz functionality as needed.
