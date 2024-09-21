import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPassages } from '../../services/passagesAPI';
import { Passage, PassagesState } from '../../types/passage';

export const getPassages = createAsyncThunk(
  'passages/getPassages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPassages();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: PassagesState = {
  passages: null,
  loading: false,
  error: null,
};

const passagesSlice = createSlice({
  name: 'passages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPassages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPassages.fulfilled,
        (state, action: PayloadAction<Passage[]>) => {
          state.loading = false;
          state.passages = action.payload;
        }
      )
      .addCase(getPassages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const passagesReducer = passagesSlice.reducer;
