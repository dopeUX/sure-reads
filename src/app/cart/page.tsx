'use client';
import { useSelector } from "react-redux";
import ModalDialog from "../common/ModalDialog/ModalDialog"
import AppLayout from "../layouts/AppLayout/AppLayout.component"
import CartScreen from "../screens/CartScreen/CartScreen.component"
import { RootState } from "../store/store";

const CartPage = () => {
	const isModalDialog = useSelector((state: RootState) => {
		return state.AppReducer.isModalDialog;
	})
	return (
	 <>
	  {isModalDialog && <ModalDialog/>}
	  <AppLayout>
	     <CartScreen/>
	  </AppLayout>
	 </>	  	
	)
}

export default CartPage;