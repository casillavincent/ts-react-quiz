import React from "react";
import { AnswerObject } from "../App";

// Default Props
export type Props = {
   question: string;
   answers: string[];
   cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
   userAnswer: AnswerObject | undefined;
   questionNr: number;
   totalQuestions: number;
};

// Use Function Components
const Questions = ({ question, answers, cb, userAnswer, questionNr, totalQuestions }: Props) => {
   return (
      <div>
         {/* Question number and total indicator */}
         <p className="question-number">
            Question: {questionNr} / {totalQuestions}
         </p>

         {/*  It's dangerous because you dont know what will get injected inside the element  */}
         <p className="question" dangerouslySetInnerHTML={{ __html: question }} />

         {/* List of Answers here */}
         <div className="answers">
            {answers.map((answer) => (
               <div key={answer}>
                  {/* Disabled is a boolean attribute for button;
                  A disabled button is unusable and un-clickable */}

                  <button disabled={userAnswer ? true : false} value={answer} onClick={cb}>
                     {/* Needs to be a self closing tag */}
                     <p dangerouslySetInnerHTML={{ __html: answer }} />
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Questions;
