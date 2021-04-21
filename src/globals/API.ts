export const fetchQuestions = async (amount: number) => {
   const data = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=easy&type=multiple`;
   const response = await (await fetch(data)).json();
   return response;
};
