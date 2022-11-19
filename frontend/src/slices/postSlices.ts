import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  post as postService,
  addLike,
  remove,
  newComment,
} from "../services/postService";

interface initialState {
  success: boolean;
  error: boolean | unknown;
  loading: boolean;
}
interface Post {
  content?: string;
  image: File | null;
  url: string;
}

const initialState: initialState = {
  success: false,
  error: false,
  loading: false,
};

export const newPost = createAsyncThunk(
  "post/new",
  async (post: FormData, thunkAPI) => {
    const response = await postService(post);
    console.log(response);
    if (response.error) thunkAPI.rejectWithValue(response.error);

    return response;
  }
);

export const postlike = createAsyncThunk(
  "post/addLike",
  async (id: string, thunkAPI) => {
    const response = await addLike(id);
    console.log(response);
    if (response.error) thunkAPI.rejectWithValue(response.error);

    return response;
  }
);
export const addNewComment = createAsyncThunk(
  "post/comment",
  async (data: { id: string; comment: string }, thunkAPI) => {
    const response = await newComment(data);
    console.log(response);
    if (response.error) thunkAPI.rejectWithValue(response.error);

    return response;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false), (state.error = false), (state.success = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newPost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(newPost.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(newPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postlike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postlike.fulfilled, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(postlike.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(addNewComment.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(addNewComment.fulfilled, (state) => {
        state.loading = true;
        state.error = false;
        state.success = true;
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const selectPost = (state: initialState) => state;
export default postSlice.reducer;
