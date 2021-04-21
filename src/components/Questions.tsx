import React from "react";

type Props = {
   questions: unknown;
};

// Question Card
const Questions = ({ questions }: { questions: Props["questions"] }): JSX.Element => {
   return (
      <div className="questions-card">
         <h1>Questions</h1>
         {questions.map((question) => {
            console.log("works");
         })}
      </div>
   );
};

export default Questions;
