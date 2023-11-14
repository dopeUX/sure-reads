'use client';
import React from "react";
import LibraryScreen from "../screens/LibraryScreen/LibraryScreen.component";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DialogLayout from "../layouts/DialogLayout/DialogLayout.component";

const library = () => {
	const showDialog = useSelector((state: RootState) => {
		return state.AppReducer.showDialog;
	  });
	return (
	 <>
     {showDialog && <DialogLayout/>}
	  <LibraryScreen/>
	  </>	
	)
}

export default library;