import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  items: [
    { id: 99, cellId: 1 },
  ],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    addFear: (state, payload) => {
      state.push(payload);
    },
    removeFear: (state, payload) => {
      state.filter(({ id }) => payload.id);
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addFear, removeFear } = gameSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default gameSlice.reducer;