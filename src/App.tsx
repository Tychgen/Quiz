import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks/storeHooks';
import { RootState, AppDispatch } from './store/store';
import { fetchQuizQuestions, QuestionsState, Difficulty } from './API';
import QuestionCard from './components/QuestionCard';
import { setQuestions, setScore, setUserAnswers, setNumber, setGameOver } from './store/slices/quizSlice';
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    question:string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  }


const App = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state: RootState) => state.quiz.questions);
  const number = useAppSelector((state: RootState) => state.quiz.number);
  const userAnswers = useAppSelector((state: RootState) => state.quiz.userAnswers);
  const score = useAppSelector((state: RootState) => state.quiz.score);
  const gameOver = useAppSelector((state: RootState) => state.quiz.gameOver);

  const [loading, setLoading] = useState(false);

  const startTrivia = async () => {
    setLoading(true);
    dispatch(setGameOver(false));
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    dispatch(setQuestions(newQuestions));
    dispatch(setScore(0));
    dispatch(setUserAnswers([]));
    dispatch(setNumber(0));
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) dispatch(setScore(score + 1));
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      dispatch(setUserAnswers([...userAnswers, answerObject]));
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      dispatch(setGameOver(true));
    } else {
      dispatch(setNumber(nextQ));
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Sual & Cavab, Quiz</h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        )}
        {!gameOver && <p className='score'>Score: {score}</p>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        )}
      </Wrapper>
    </>
  );
};

export default App;






























































// import React, { useState } from 'react';
// import { fetchQuizQuestions } from './API';
// // Components
// import QuestionCard from './components/QuestionCard';
// // types
// import { QuestionsState, Difficulty } from './API';
// // Styles
// import { GlobalStyle, Wrapper } from './App.styles';

// export type AnswerObject = {
//   question:string;
//   answer: string;
//   correct: boolean;
//   correctAnswer: string;
// }

// const TOTAL_QUESTIONS = 10;

// const App = () => {
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState<QuestionsState[]>([]);
//   const [number, setNumber] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(true);

//   const startTrivia = async () => {
//     setLoading(true);
//     setGameOver(false);
//     const newQuestions = await fetchQuizQuestions(
//       TOTAL_QUESTIONS,
//       Difficulty.EASY
//     );
//     setQuestions(newQuestions);
//     setScore(0);
//     setUserAnswers([]);
//     setNumber(0);
//     setLoading(false);
//   };

//   const checkAnswer = (e: any) => {
//     if (!gameOver) {
//       // User's answer
//       const answer = e.currentTarget.value;
//       // Check answer against correct answer
//       const correct = questions[number].correct_answer === answer;
//       // Add score if answer is correct
//       if (correct) setScore((prev) => prev + 1);
//       // Save the answer in the array for user answers
//       const answerObject = {
//         question: questions[number].question,
//         answer,
//         correct,
//         correctAnswer: questions[number].correct_answer,
//       };
//       setUserAnswers((prev) => [...prev, answerObject]);
//     }
//   };

//   const nextQuestion = () => {
//     // Move on to the next question if not the last question
//     const nextQ = number + 1;

//     if (nextQ === TOTAL_QUESTIONS) {
//       setGameOver(true);
//     } else {
//       setNumber(nextQ);
//     }
//   };


//   return (
//     <>
//       <GlobalStyle />
//       <Wrapper>
//         <h1>Sual & Cavab , Quiz</h1>
//         {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
//           <button className='start' onClick={startTrivia}>
//             Start
//           </button>
//         ) : null}
//         {!gameOver ? <p className='score'>Score: {score}</p> : null}
//         {loading ? <p>Loading Questions...</p> : null}
//         {!loading && !gameOver && (
//           <QuestionCard
//             questionNr={number + 1}
//             totalQuestions={TOTAL_QUESTIONS}
//             question={questions[number].question}
//             answers={questions[number].answers}
//             userAnswer={userAnswers ? userAnswers[number] : undefined}
//             callback={checkAnswer}
//           />
//         )}
//         {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
//           <button className='next' onClick={nextQuestion}>
//             Next Question
//           </button>
//         ) : null}
//       </Wrapper>
//     </>
//   );
// };

// export default App;
