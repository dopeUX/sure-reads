import { createSlice } from "@reduxjs/toolkit";

interface stateTypes {
  showDialog: boolean;
}

const initialState:stateTypes = {
  showDialog:true
}

export const AppSlice = createSlice({
    name: 'AppSlice',
    initialState,
    reducers: {
      updateDialogState:(state, action) => {
        state.showDialog = action.payload;
      }
    }
});


export const {updateDialogState} = AppSlice.actions;
export default AppSlice.reducer;