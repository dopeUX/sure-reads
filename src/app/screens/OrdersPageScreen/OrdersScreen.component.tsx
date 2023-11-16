'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from '../../../../public/assets/sure-reads-logo.svg';
import { useRouter } from "next/navigation";
import './OrdersScreen.component.css';
import getAllCartItems from "@/app/helpers/cartItemsService";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderHistory } from "@/app/store/AppSlice";
import CartItem from "@/app/common/CartItemTile/CartItem";
import { RootState } from "@/app/store/store";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export interface OrdersScreenProps {

}

const OrdersScreen = ({}) => {
    const router = useRouter();
	const [orders, setOrders] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const ordersFromRedux = useSelector((state:RootState)=> {
	  return state.AppReducer.orderHistory;	
	})
	useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
	  const currentUser = localStorage.getItem('currentUser');
	  if(!isLoggedIn && !currentUser) {
		router.push('/login');
	  } else {
		let orderHistory:any = localStorage.getItem('orderHistory');
		// orderHistory = JSON.parse(orderHistory);
		if(!orderHistory) {
          localStorage.setItem('orderHistory', JSON.stringify([]));
		  setOrders([]);
		} else {
		  if(ordersFromRedux.length>0) {	
			setOrders([...ordersFromRedux]);
			setIsLoading(false);
		  } else {
		    getData(orderHistory);
		  }
		}
	  }
	}, [])
	const getData = async (ids: string) => {
		const response: any = await getAllCartItems(ids);
		console.log(response, 'uuuuu')
		setOrders([...response.data]);
        dispatch(updateOrderHistory([...response.data]));
		setIsLoading(false);
	}
	return (
	  <div className="orders-screen global-container">
         <div className="header">
          <Image className="logo" src={logo} alt=""/>
		  <h2 className="primary-text back" onClick={() => {
			router.push('/')
		  }}>Back To Home</h2>
		 </div>
         { isLoading ? <div className="skeleton-loading">
		   <Skeleton className="load" count={1} width={'100%'} height={80}/>
           <Skeleton className="load" count={1} width={'100%'} height={80}/>
           <Skeleton className="load" count={1} width={'100%'} height={80}/>
           <Skeleton className="load" count={1} width={'100%'} height={80}/>
		 </div> :
		 <div className="products-section">
			<h2>Order History</h2>
			<div className="product-tiles">
			   {
				orders.length>0 && orders.map((item:any, index:number)=>{
					return(
					  <CartItem key={index} id={item.id} image={item.volumeInfo.imageLinks.thumbnail}
						title={item.volumeInfo.title} author={item.volumeInfo.authors.join(', ')}
						price={item.saleInfo.listPrice.amount}/>
					)
				})
			   }
			</div>
		 </div> }
	  </div>	
	)
}

export default OrdersScreen;