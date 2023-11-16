'use client';
import React, { useEffect, useState } from "react";
import './CheckoutScreen.component.css';
import Image from "next/image";
import logo from '../../../../public/assets/sure-reads-logo.svg';
import { useRouter } from "next/navigation";
import FilledButton from "@/app/common/FilledButton/FilledButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateCartItems, updateIsCheckoutDirect } from "@/app/store/AppSlice";
import toast, { Toaster } from 'react-hot-toast';
export interface CheckoutScreenProps{
  
}

const CheckoutScreen:React.FC<CheckoutScreenProps> = ({}) => {
  const router = useRouter()	
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const labelMappings:any = {
	firstName:'First Name',
	lastName:'Last Name',
	phone:'Phone number',
	email:'Email',
	address:'Address',
	pincode:'Pincode',
	state:'State'
  }
  const cartItems = useSelector((state: RootState) => {
	return state.AppReducer.cartItems
  })
  const isCheckoutRedirect = useSelector((state:RootState) => {
	return state.AppReducer.isCheckoutDirect;
  })
  useEffect(() => {
   console.log(cartItems, 'iiiiiii')	
   const isLoggedIn = localStorage.getItem('isLoggedIn');
   
   if(!isLoggedIn) {
	 router.push('/');
   } else if(isCheckoutRedirect) {
     router.push('/cart');
   } else {
	 const currentUser = localStorage.getItem('currentUser');
	 if(currentUser) {
		setCurrentUser(JSON.parse(currentUser));
	 }
	 dispatch(updateIsCheckoutDirect(true));
   }
  },[])

  const onChangeListener = (field: string, value: string) => {
	const obj = {
		...currentUser,
		[field]:value
	}
	setCurrentUser(obj);
  }
  
  const saveOrder = () => {
	 let correct = true;
	 let str = '';
	 Object.keys(currentUser).forEach((item: any, index) => {
        if(correct) {
		  if(!currentUser[item] || currentUser[item]=='' || currentUser===null) {
            correct = false;
			str = labelMappings[item];
		  }
		}
	 })
	 if(!correct && str) {
		toast.error(`${str} should not be left empty`);
	 } else {
		setIsLoading(true);
		const ids = cartItems.map((item: any) => {
          return {id:item.id, quantity:1}
		})
		dispatch(updateCartItems([]));
		localStorage.setItem('cartItems', JSON.stringify([]));
		localStorage.setItem('orderHistory', JSON.stringify(ids));
		setTimeout(() => {
           setIsLoading(false)
		   toast.success('Order Saved, Thanks for shopping', {
			style: {
			  textAlign:'center',	
			  border: '1px solid #22A699',
			  padding: '16px',
			  color: '#22A699',
			},
			iconTheme: {
			  primary: '#22A699',
			  secondary: '#FFFFFF',
			},
		});
		setTimeout(() => {
          router.push('/')
		},500)
		},2000)
	 }
  }
  return (
	<div className="checkout-screen global-container">
	  <Toaster position="bottom-center" />
      <div className="header">
          <Image className="logo" src={logo} alt=""/>
		  <h2 className="primary-text back" onClick={() => {
			router.push('/')
		  }}>Back To Home</h2>
		 </div>
		 <div className="checkout-form">
			<h4>Checkout</h4>
			<div className="form-section">
		    <div className="name-sec">		
			  <div className="input-div">
                  <p>First Name</p>
			  	<input value={currentUser && currentUser.firstName} type="text" title="name" onChange={(e) => {
					onChangeListener('firstName',e.target.value);
				}}/>
			  </div>
			  <div className="input-div">
                  <p>Last Name</p>
			  	<input value={currentUser && currentUser.lastName} type="text" title="name" onChange={(e) => {
					onChangeListener('lastName', e.target.value);
				}}/>
			  </div>
			</div>
			<div className="input-div">
                <p>Email</p>
			  	<input className="custom" value={currentUser && currentUser.email} type="text" title="name" onChange={(e) => {
					onChangeListener('email', e.target.value);
				}}/>
			</div>
			<div className="name-sec">		
			  <div className="input-div">
                  <p>State</p>
			  	<input value={currentUser && currentUser.state} type="text" title="name" onChange={(e) => {
					onChangeListener('state', e.target.value)
				}}/>
			  </div>
			  <div className="input-div">
                  <p>Pincode</p>
			  	<input value={currentUser && currentUser.pincode} type="text" title="name" onChange={(e) => {
					onChangeListener('pincode', e.target.value)
				}}/>
			  </div>
			</div>
			<div className="input-div">
                  <p>Phone number</p>
			  	<input className="custom" value={currentUser && currentUser.phone} type="text" title="name" onChange={(e) => {
					onChangeListener('phone', e.target.value);
				}}/>
			  </div>
			 <div className="input-div">
                  <p>Address</p>
			  	<input className="custom" value={currentUser && currentUser.address} type="text" title="name" onChange={(e) => {
					onChangeListener('address', e.target.value);
				}}/>
			 </div>  
			</div> 
			<div className="btn-sec">
			  <FilledButton title="Confirm Order" click={() => {
				saveOrder();
			  }}/>
			  {isLoading && <p className="save">Saving your order...</p>}
			</div>
		 </div>
	</div>
  )	
}

export default CheckoutScreen;