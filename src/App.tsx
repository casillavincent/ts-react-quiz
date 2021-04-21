import { start } from "node:repl";
import React, { ReactNode, useState } from "react";
import Questions from "./components/Questions";

// Globals
import { fetchQuestions } from "./globals/API";
import { Difficulty, QuestionsState } from "./globals/API";

// Conventional Props
const Heading = ({ title }: { title: string }) => <h1>{title}</h1>;
const Background = ({ children }: { children: ReactNode }): JSX.Element => {
   return <div className="project-background">{children}</div>;
};

// Vars
const TOTAL_QUESTIONS = 10;

// Types
export type AnswerObject = {
   question: string;
   answer: string;
   correct: boolean;
   correctAnswer: string;
};

function App() {
   /*
   -----------------------------------
            States
   -----------------------------------
   */
   const [loading, setLoading] = useState(false);
   const [questions, setQuestions] = useState<QuestionsState[]>([]);
   const [number, setNumber] = useState(0);
   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
   const [score, setScore] = useState(0);
   const [gameOver, setGameOver] = useState(true);

   /*
   -----------------------------------
            Functions
   -----------------------------------
   */

   // Initiate the trivia
   const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
   };

   // Check the answer
   /*
   e = Event
   We need to specify it more or TS will complain
   In this case we specify it as a MouseEvent from a Button El.
   */
   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameOver) {
         // This is the users answer
         const answer = e.currentTarget.value;

         // Check answer against correct answer
         const correct = questions[number].correct_answer === answer;

         if (correct) setScore((prev) => prev + 1);

         // Save answer in the array for user answers
         const answerObject = {
            question: questions[number].question,
            // This is the same as answer: answer or correct: correct
            answer,
            correct,
            correctAnswer: questions[number].correct_answer,
         };

         setUserAnswers((prev) => [...prev, answerObject]);
      }
   };

   const nextQuestion = () => {
      const nextQuestion = number + 1;
      if (nextQuestion === TOTAL_QUESTIONS) {
         setGameOver(true);
      } else {
         setNumber(nextQuestion);
      }
   };

   return (
      <div className="App">
         <Heading title="React Quiz" />
         <Background>A small project to help me better understand TypeScript and React.</Background>

         <div className="quiz-wrapper" id="quiz-wrapper">
            {/* Button that starts the quiz */}

            {/* If its gameover or at the last question it will turn off button */}
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
               <button className="start-quiz" onClick={startTrivia}>
                  Start Quiz
               </button>
            ) : null}

            {/* Shows the score if the game isnt over */}
            {!gameOver ? <p className="score">Score: {score}</p> : null}
            {loading && <p>Loading Questions ... </p>}

            {/* Load Questions Here */}
            {!loading && !gameOver && (
               <Questions
                  question={questions[number].question}
                  answers={questions[number].answers}
                  cb={checkAnswer}
                  userAnswer={userAnswers ? userAnswers[number] : undefined}
                  questionNr={number + 1}
                  totalQuestions={TOTAL_QUESTIONS}
               />
            )}

            {/* Button for Next Question */}
            {!gameOver && !loading && userAnswers.length === number + 1}
            <button className="next-question-toggle" onClick={nextQuestion}>
               Next Question
            </button>
         </div>
      </div>
   );
}

export default App;
