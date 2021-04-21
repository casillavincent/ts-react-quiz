import { start } from "node:repl";
import React, { ReactNode, useState, useEffect } from "react";
import { setConstantValue } from "typescript";
import Questions from "./components/Questions";
import { fetchQuestions } from "./globals/API";

const Heading = ({ title }: { title: string }) => <h1>{title}</h1>;
const Background = ({ children }: { children: ReactNode }): JSX.Element => {
   return <div className="project-background">{children}</div>;
};

function App() {
   const [questions, setQuestions] = useState<any>(null);
   const [triviaStart, setTriviaStart] = React.useState<boolean>(false);

   return (
      <div className="App">
         <Heading title="React Quiz" />
         <Background>A small project to help me better understand TypeScript and React.</Background>

         {/* Load Questions Here */}
         <button
            onClick={() => {
               setTriviaStart(!triviaStart);
               setQuestions(fetchQuestions(10));
            }}
         >
            Show Questions
         </button>
         {triviaStart && <Questions questions={questions} />}
      </div>
   );
}

export default App;
