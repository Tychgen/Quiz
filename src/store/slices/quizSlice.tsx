import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionsState} from '../../API';
import { AnswerObject } from '../../App';

interface QuizState {
  loading: boolean;
  questions: QuestionsState[];
  number: number;
  userAnswers: AnswerObject[];
  score: number;
  gameOver: boolean;
}

const initialState: QuizState = {
  loading: false,
  questions: [],
  number: 0,
  userAnswers: [],
  score: 0,
  gameOver: true,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQuestions: (state, action: PayloadAction<QuestionsState[]>) => {
      state.questions = action.payload;
    },
    setNumber: (state, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
    setUserAnswers: (state, action: PayloadAction<AnswerObject[]>) => {
      state.userAnswers = action.payload;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.gameOver = action.payload;
    },
  },
});

export const {
  setLoading,
  setQuestions,
  setNumber,
  setUserAnswers,
  setScore,
  setGameOver,
} = quizSlice.actions;

export default quizSlice.reducer;