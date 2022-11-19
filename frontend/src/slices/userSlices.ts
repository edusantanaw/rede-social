import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, logout } from "../services/userService";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
interface User {
  name?: string;
  password: string;
  email: string;
  confirmPassword?: string;
  type: string;
  logged?: boolean;
  error?: string;
}

interface initial {
  user: User | null;
  error: boolean | unknown;
  success: boolean;
  loading: boolean;
  logged: boolean;
}

interface Reducer {
  userReducer: initial;
}

const initialState: initial = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
  logged: user.name ? true : false,
};

export const userAuth = createAsyncThunk(
  "user/authenticate",
  async (user: User, thunkAPI) => {
    const response = await auth(user);
    console.log(response);
    if (response.error) return thunkAPI.rejectWithValue(response.error);
    return response;
  }
);

export const userLogout = createAsyncThunk("user/logout", async () => {
  await logout();
  return;
});

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
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.success = false;
        state.error = action.payload;
        state.logged = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.logged = false;
        state.user = null
      });
  },
});

export const selectUser = (state: Reducer) => state;
export default userSlice.reducer;
