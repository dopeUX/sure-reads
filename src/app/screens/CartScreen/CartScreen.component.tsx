'use client';
import getAllCartItems from "@/app/helpers/cartItemsService";
import { useRouter } from "next/navigation";
import React,{useEffect, useState} from "react";
import './CartScreen.component.css';
import logo from '../../../../public/assets/sure-reads-logo.svg';
import Image from "next/image";
import CartItem from "@/app/common/CartItemTile/CartItem";
import FilledButton from "@/app/common/FilledButton/FilledButton";
import { useDispatch } from "react-redux";
import { updateCartItems, updateIsCheckoutDirect } from "@/app/store/AppSlice";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
export interface CartScreenProps {

}

const CartScreen:React.FC<CartScreenProps> = ({}) => {
	const router = useRouter();
	const [cartItems, setCartItems] = useState<Array<any>>([]);
	const [cartItemsFromRedux, setCartItemsFromRedux] = useState<Array<any>>([]);
    const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [summary, setSummary] = useState<any>({});
	useEffect(() => {
	  setIsLoading(true);	
      const isLoggedIn = localStorage.getItem('isLoggedIn');
	  if(!isLoggedIn) {
        router.push('/login');
	  } else {
        const ids:any = localStorage.getItem('cartItems');
		console.log(JSON.stringify(ids), 'eeee')
		if(ids.length > 0) {
		 getData(ids);
		} else {
			setCartItems([]);
			setIsLoading(false)
		}
	  }
	},[])
    
	const calculateExpense = (arr:any) => {
	  let checkoutTotal = 0;
	  let totalPrice = 0;
	  console.log(cartItems, 'rrrrr')
	  arr.forEach((item: any) => {
		 const price = item.saleInfo.listPrice.amount;
		 checkoutTotal = checkoutTotal + price;
	  })
	  totalPrice = checkoutTotal + 180;
	//   console.log(priceTotal, 'rrrr')
	  setSummary({...summary, 'checkoutTotal':checkoutTotal, 'total':totalPrice})
	}
	const getData = async (ids: string) => {
		const response: any = await getAllCartItems(ids);
		console.log(response, 'uuuuu')
		setCartItems([...response.data]);
		setCartItemsFromRedux([...response.data]);
        dispatch(updateCartItems([...response.data]));
		calculateExpense([...response.data]);
		setIsLoading(false);
	}
	return (
	  <div className="cart-screen global-container">
         <div className="header">
          <Image className="logo" src={logo} alt=""/>
		  <h2 className="primary-text back" onClick={() => {
			router.push('/')
		  }}>Back To Home</h2>
		 </div>
		 {isLoading ? <div className="skeleton-loading">
            <Skeleton className="load" count={1} width={'100%'} height={80}/>
            <Skeleton className="load" count={1} width={'100%'} height={80}/>
            <Skeleton className="load" count={1} width={'100%'} height={80}/>
            <Skeleton className="load" count={1} width={'100%'} height={80}/>
		 </div> :
		 <div className="cart-page-content">
			<section className="left-col">
			   <h3 className="your-cart">Your Cart <span className="primary-text">{cartItems?.length} items</span></h3>
			   {cartItems.length>0 ? <div><div className="cart-items-section">
				 {
					cartItemsFromRedux && cartItemsFromRedux?.map((item: any, index: number) => {
					  return <CartItem key={index} id={item.id} image={item.volumeInfo.imageLinks.thumbnail}
					  title={item.volumeInfo.title} author={item.volumeInfo.authors.join(', ')}
					  price={item.saleInfo.listPrice.amount}/>	
					})
				 }
			   </div>
			   <FilledButton classN="button" title="Proceed to checkout" click={() => {
				 dispatch(updateIsCheckoutDirect(false));
				 setTimeout(()=> {
					router.push('/checkout');
				 },50)
			   }}/> </div> : <div>
				<h3>No Items in your cart</h3>
			   </div> }
			</section>
			<section className="right-col">
				<div className="flex-row">
					<p>Checkout : </p>
					<p className="price primary-text">{summary['checkoutTotal']} INR</p>
				</div>
				<div className="flex-row">
					<p>Taxes : </p>
					<p className="price primary-text">180 INR</p>
				</div>
				<div className="flex-row">
					<p>Delivery charges : </p>
					<p className="price primary-text">Free</p>
				</div>
				<div className="divider"></div>
				<div className="flex-row">
					<p>Total : </p>
					<p className="price primary-text">{summary['total']} INR</p>
				</div>
			</section>
		 </div> }
	  </div>	
	)
}

export default CartScreen;