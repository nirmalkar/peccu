import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { uploadAudio } from '../../services/apiService';

interface PronunciationState {
  feedBack: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PronunciationState = {
  feedBack: null,
  loading: false,
  error: null,
};

export const uploadPronunciation = createAsyncThunk(
  'pronunciation/uploadPronunciation',
  async (
    { userId, file }: { userId: number; file: File },
    { rejectWithValue }
  ) => {
    try {
      const feedback = await uploadAudio(userId, file);
      return feedback;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const pronunciationSlice = createSlice({
  name: 'pronunciation',
  initialState,
  reducers: {
    fetchFeedbackStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFeedbackSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.feedBack = action.payload;
    },
    fetchFeedBackFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFeedBackFailure,
  fetchFeedbackStart,
  fetchFeedbackSuccess,
} = pronunciationSlice.actions;

export const pronunciationReducer = pronunciationSlice.reducer;
