import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { pdfReducer } from "./slices/pdfSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    pdfData:pdfReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
