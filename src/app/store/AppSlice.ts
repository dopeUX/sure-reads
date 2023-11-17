import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface stateTypes {
  showDialog: boolean;
  currentBookId: string;
  cartItems: Array<any>;
  totalBooksCount:number;
  isCheckoutDirect:boolean;
  orderHistory:Array<any>;
  currentDeleteItemId:number|undefined;
  isModalDialog:boolean;
  isDeleteClicked: boolean;
}

const initialState:stateTypes = {
  showDialog:false,
  currentBookId:'1',
  cartItems:[],
  totalBooksCount:0,
  isCheckoutDirect:true,
  orderHistory:[],
  currentDeleteItemId:undefined,
  isModalDialog: false,
  isDeleteClicked: false
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
      },
      updateIsCheckoutDirect:(state, action) => {
        state.isCheckoutDirect = action.payload
      },
      updateOrderHistory:(state, action) => {
        state.orderHistory = action.payload
      },
      updateIsModalDialog:(state,action) => {
        state.isModalDialog = action.payload;
      },
      updateCurrentDeleteItemId:(state, action) => {
        state.currentDeleteItemId = action.payload;
      },
      updateIsDeleteClicked:(state, action) => {
        state.isDeleteClicked = action.payload;
      }
    }
});


export const {updateDialogState, updateIsDeleteClicked, updateCurrentDeleteItemId,updateIsModalDialog, updateTotalBooksCount,updateOrderHistory, updateIsCheckoutDirect, updateCurrentBookId, updateCartItems} = AppSlice.actions;
export default AppSlice.reducer;