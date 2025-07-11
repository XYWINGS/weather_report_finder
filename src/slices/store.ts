import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "@slices/weatherSlice";
import locationReducer from "@slices/locationSlice";
import {useDispatch, type TypedUseSelectorHook, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
