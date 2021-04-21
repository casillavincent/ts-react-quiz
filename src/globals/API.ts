import { shuffleArray } from "./utilities";

// This is the types for the API data
export type Question = {
   category: string;
   correct_answer: string;
   difficulty: string;
   incorrect_answers: string[];
   question: string;
   type: string;
};

export type QuestionsState = Question & { answers: string[] };

export enum Difficulty {
   EASY = "easy",
   MEDIUM = "medium",
   HARD = "hard",
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
   const data = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;

   // Awaits for the JSON then awaits for the fetch itself - why there's two awaits
   const response = await (await fetch(data)).json();

   return response.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
   }));
};
