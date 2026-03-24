import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../services/userService';
import type { UserState, UserRegistrationData, UserRegistrationResponse } from '../types/userTypes';
import type { RootState } from '../../../store';

const initialState: UserState = {
  registrationStatus: 'idle',
  error: null,
};

export const performRegistration = createAsyncThunk<UserRegistrationResponse, UserRegistrationData>(
  'users/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetRegistrationStatus: (state) => {
      state.registrationStatus = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(performRegistration.pending, (state) => {
        state.registrationStatus = 'loading';
        state.error = null;
      })
      .addCase(performRegistration.fulfilled, (state) => {
        state.registrationStatus = 'succeeded';
      })
      .addCase(performRegistration.rejected, (state, action) => {
        state.registrationStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetRegistrationStatus } = userSlice.actions;

// Selectores
export const selectRegistrationStatus = (state: RootState) => state.users.registrationStatus;
export const selectRegistrationError = (state: RootState) => state.users.error;

export default userSlice.reducer;