import { createSlice } from "@reduxjs/toolkit";

interface stateTypes {
  showDialog: boolean;
  currentBookId: string;
}

const initialState:stateTypes = {
  showDialog:false,
  currentBookId:'1' 
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
      }
    }
});


export const {updateDialogState, updateCurrentBookId} = AppSlice.actions;
export default AppSlice.reducer;