import Image from "next/image";
import React, { useState } from "react";
import './CartItem.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateCartItems, updateCurrentDeleteItemId, updateIsModalDialog } from "@/app/store/AppSlice";

export interface CartItemProps {
  id: number;	
  image: string;
  title: string;
  author: string;
  price: number;
  deleteItem?:any;
}

const CartItem:React.FC<CartItemProps> = ({id, image, title, author, price, deleteItem}) => {
    const [quantity, setQuantity] = useState<number>(1);
	const cartItems = useSelector((state:RootState) => {
		return state.AppReducer.cartItems;
	})
	const isModalDialog = useSelector((state: RootState) => {
		return state.AppReducer.isModalDialog;
	})
	const dispatch = useDispatch();
	return (
	<div className="cart-item-tile">
      <Image className="img" width={100} height={100} src={image} alt=""/>
	  <div className="item-details">
		<h3>{title}</h3>
		<p>{author}</p>
		<p className="price"><span>{price}</span> INR</p>
		{deleteItem && <p className="delete" onClick={() => {
		   if(!isModalDialog) {
			 dispatch(updateCurrentDeleteItemId(id));
		     dispatch(updateIsModalDialog(true));
		   }
			// deleteItem(id)
		}}>Delete this item</p>}
	    {/* <div className="quan-sec">
			<button onClick={()=>{
				if(quantity!==1) {
				 setQuantity(prev => prev - 1)
				 let index:any;
				 let item = cartItems.find((x, i) => {
					index = i; 
					return x.id === id
				});
				 item.saleInfo.listPrice.amount = item.saleInfo.listPrice.amount * quantity;
				 let items:any = localStorage.getItem('cartItems')
				 items = JSON.parse(items);
				 items[index].quantity = quantity; 
				 localStorage.setItem('cartItems', JSON.stringify(items))
				 cartItems[index] = item
				 dispatch(updateCartItems([...cartItems]))
				}
			}}>-</button>
			<p>{quantity}</p>
			<button onClick={() => {
				setQuantity(prev => prev + 1)
				let index:any;
				 let item = cartItems.find((x, i) => {
					index = i; 
					return x.id === id
				 });
				 let it = {...item};
				 Object.defineProperties(it, {saleInfo:{writable:true}})
				 it.saleInfo.listPrice.amount = item.saleInfo.listPrice.amount * quantity;
				 let items:any = localStorage.getItem('cartItems')
				 items = JSON.parse(items);
				 items[index].quantity = quantity; 
				 localStorage.setItem('cartItems', JSON.stringify(items))
				 cartItems[index] = {...it};
				 dispatch(updateCartItems([...cartItems]))
			}}>+</button>
		</div> */}
	  </div>
	</div>
  )	
}

export default CartItem;