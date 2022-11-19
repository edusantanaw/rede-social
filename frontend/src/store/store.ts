import {
  AnyAction,
  configureStore,
  Store,
  ThunkDispatch,
} from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlices from "../slices/userSlices";
import postSlice from "../slices/postSlices";

const store = configureStore({
  reducer: {
    userReducer: userSlices,
    postReducer: postSlice,
  },
});
export type RootState = ReturnType<typeof userSlices>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};
export default store;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
