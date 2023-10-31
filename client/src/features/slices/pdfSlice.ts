import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PdfData {
  pdfUrl: string | null;
}

const initialState: PdfData = {
  pdfUrl: null,
};

const pdfSlice = createSlice({
  name: "pdfData",
  initialState,
  reducers: {
    setPdfData(state, action: PayloadAction<{ pdfUrl: string}>) {
      state.pdfUrl = action.payload.pdfUrl
    },
    clearPdfData(state) {
      state.pdfUrl = null;
    }
  },
});

export const { setPdfData, clearPdfData } = pdfSlice.actions;

export const selectPdfUrl = (state: RootState) => state.pdfData.pdfUrl;

export const pdfReducer = pdfSlice.reducer;
