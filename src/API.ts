// Utilities
import { shuffleArray } from "./utilities";

export type Question = {
   category: string;
   correct_answer: string;
   difficulty: string;
   incorrect_answers: string[];
   question: string;
   type: string;
};

// Will make it so it will only accept these identifiers
export enum Difficulty {
   EASY = "easy",
   MEDIUM = "medium",
   HARD = "hard",
}

export type QuestionState = Question & { answers: string[] };

export const fetchApiQuestions = async (
   amount: number,
   difficulty: Difficulty
): Promise<QuestionState[]> => {
   const response = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
   // 2 Awaits mean it will await the fetch itself and when you convert to JSON
   const data = await (await fetch(response)).json();
   return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
   }));
};
