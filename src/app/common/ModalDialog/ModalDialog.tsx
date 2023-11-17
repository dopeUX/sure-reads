'use client';
import React, { useEffect, useRef } from "react";
import './ModalDialog.css';
import FilledButton from "../FilledButton/FilledButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateCurrentDeleteItemId, updateDialogState, updateIsDeleteClicked, updateIsModalDialog } from "@/app/store/AppSlice";
export interface ModalDialogProps {
  isOpen?:boolean;
  action?:any
}

const ModalDialog:React.FC<ModalDialogProps> = ({}) => {
  const modalRef:any = useRef(); 
  const dialogRef: any = useRef();
  const isModalDialog = useSelector((state: RootState) => {
    return state.AppReducer.isModalDialog;
  });
  const dispatch = useDispatch();
  useEffect(() =>{
    
   },[]);
   const closeModal = () => {
    if(modalRef && isModalDialog) {
      modalRef.current.style.animation = 'zoom-out cubic-bezier(0.77, 0, 0.175, 1) .5s forwards'
      setTimeout(() => {
        dialogRef.current.style.opacity = 0;
      },500)
      setTimeout(() => {
        dispatch(updateIsModalDialog(false));
      }, 1000);
    }
   }
   return (
	    <div ref={dialogRef} className="modal-dialog index-99">
        <div ref={modalRef} className="modal-popup">
          <h4>Are you sure you want to delete this item from your cart ?</h4>
          <div className="btns">
            <FilledButton classN="cancel" title="Cancel" click={() =>{
               closeModal();
               dispatch(updateIsDeleteClicked(false));
               dispatch(updateCurrentDeleteItemId(undefined));
            }}/>
            <FilledButton title="Delete" click={() => {
               closeModal();
               setTimeout(() => {
                dispatch(updateIsDeleteClicked(true));
               },500)
            }}/>
          </div>
        </div>
      </div>
  )	
}

export default ModalDialog;