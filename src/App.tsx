import { start } from "node:repl";
import React from "react";
import { useState } from "react";

// Globals
import { Difficulty, QuestionState, fetchApiQuestions } from "./API";

// Components
import Questions from "./components/Questions";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
   question: string;
   answer: string;
   correct: boolean;
   correctAnswer: string;
};

function App() {
   // Set States
   const [loading, setLoading] = useState(false);
   const [questions, setQuestions] = useState<QuestionState[]>([]);
   const [number, setNumber] = useState(0);
   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
   const [score, setScore] = useState(0);
   const [gameOver, setGameOver] = useState(true);

   const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchApiQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
      console.log(newQuestions);
   };

   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

   const nextQuestion = () => {};

   return (
      <div className="App">
         <h1>React Quiz</h1>
         {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
               Start
            </button>
         ) : null}

         {!gameOver ? <p className="score">Score:</p> : null}
         {loading && <p className="loading-questions">Loading Questions</p>}

         {/* Question card component below */}
         {!loading && !gameOver && (
            <Questions
               questionNr={number + 1}
               totalQuestions={TOTAL_QUESTIONS}
               question={questions[number].question}
               answers={questions[number].answers}
               userAnswer={userAnswers ? userAnswers[number] : undefined}
               callback={checkAnswer}
            />
         )}

         {!gameOver &&
         !loading &&
         userAnswers.length === number + 1 &&
         number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
               Next Question
            </button>
         ) : null}
      </div>
   );
}

export default App;
