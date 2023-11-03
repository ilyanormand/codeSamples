import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  error: string;
  isLoading: boolean;
  auth: boolean;
}

const initialState: State = {
  error: '',
  isLoading: true,
  auth: false
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetching(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, action: PayloadAction<boolean>) {
      state.isLoading = false;
      state.error = '';
      state.auth = action.payload;
    },
    fetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      console.error('Error fetching user');
    },
    reset(state) {
      state.isLoading = false;
      state.error = '';
      state.auth = false;
    }
  }
});

export default slice.reducer;
export const Actions = slice.actions;
