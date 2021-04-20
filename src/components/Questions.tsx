import React from "react";
import { AnswerObject } from "../App";

// Prop Type Alias
type Props = {
   question: string;
   answers: string[];
   callback: any;
   userAnswer: AnswerObject | undefined;
   questionNr: number;
   totalQuestions: number;
};

// React.FC tells it that its a functional component
const Questions: React.FC<Props> = ({
   question,
   answers,
   callback,
   userAnswer,
   questionNr,
   totalQuestions,
}) => {
   return (
      <div>
         {/* This tells the user what question they are on */}
         <p className="number">
            Question: {questionNr} / {totalQuestions}
         </p>

         <p dangerouslySetInnerHTML={{ __html: question }} />
         <div className="answers">
            {answers !== undefined &&
               answers.map((answer) => (
                  <div key={answer}>
                     <button disabled={userAnswer ? true : false} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                     </button>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default Questions;
