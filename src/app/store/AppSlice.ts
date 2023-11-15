import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface stateTypes {
  showDialog: boolean;
  currentBookId: string;
  cartItems: Array<any>;
  totalBooksCount:number;
}

const initialState:stateTypes = {
  showDialog:false,
  currentBookId:'1',
  cartItems:[],
  totalBooksCount:0
}

export const AppSlice = createSlice({
    name: 'AppSlice',
    initialState,
    reducers: {
      updateDialogState:(state, action) => {
        state.showDialog = action.payload;
      },
      updateCurrentBookId:(state, action) => {
        state.currentBookId = action.payload;
      },
      updateCartItems:(state, action) => {
        state.cartItems = action.payload
      },
      updateTotalBooksCount:(state, action) => {
        state.totalBooksCount = action.payload
      }
    }
});


export const {updateDialogState,updateTotalBooksCount, updateCurrentBookId, updateCartItems} = AppSlice.actions;
export default AppSlice.reducer;