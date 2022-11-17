import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../services/userService";

const user = JSON.parse(localStorage.getItem("@App:user") || "{}");

interface User {
    name?: string;
    password: string;
    email: string;
    confirmPassword?: string;
    type: string;
    logged: boolean;
  }

interface initial {
  user: User | null;
  error: boolean | unknown;
  success: boolean;
  loading: boolean;
  logged: boolean;
}


const initialState: initial = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
  logged: user.name ? true : false,
};
type FetchTodosError = {
  message: string;
};

export const userAuth = createAsyncThunk(
  "user/authenticate",
  async (user: User, thunkAPI) => {
    const response = await auth(user);
    if (response.error) thunkAPI.rejectWithValue(response.error);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false), (state.error = false), (state.success = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuth.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = false;
        state.logged = true;
      }).addCase(userAuth.rejected, (state, action)=>{
        state.loading = false;
        state.user =  null;
        state.success = true;
        state.error = false;
        state.logged = true;
      })
  },
});

export const selectUser = (state: initial) => state.user
export default userSlice.reducer