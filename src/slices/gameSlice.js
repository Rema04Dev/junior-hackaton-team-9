import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  score: 0,
  time: '11:07',
  items: [
    { id: 99, cellId: 1 },
  ],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    addScore: (state) => {
      state.score += 1
    },
    setScore: (state, payload) => {
      state.score = payload
    },
    resetScore: (state) => {
      state.score = 0
    },
    
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setScore, resetScore, addScore } = gameSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default gameSlice.reducer;