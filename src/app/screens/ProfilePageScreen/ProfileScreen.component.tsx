'use client';
import React, { useEffect, useState } from "react";
import './ProfileScreen.component.css';
import Image from "next/image";
import logo from '../../../../public/assets/sure-reads-logo.svg';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast, {Toaster} from 'react-hot-toast';
import FilledButton from "@/app/common/FilledButton/FilledButton";

export interface ProfileScreenProps {

}

const ProfileScreen:React.FC<ProfileScreenProps> = ({}) => {
    const router = useRouter();
	const onChangeListener = (field: string, value: string) => {
		const obj = {
			...currentUser,
			[field]:value
		}
		setCurrentUser(obj);
	  }
	  const [currentUser, setCurrentUser] = useState<any>({});
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

	  useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
		const currentUser = localStorage.getItem('currentUser');
		if(!isLoggedIn || !currentUser) {
		  router.push('/login');	
		} else {
			setCurrentUser(JSON.parse(currentUser));
		}
	  },[])
	  const saveUser = () => {
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
		   localStorage.setItem('currentUser', JSON.stringify(currentUser))
		   setIsLoading(true);
		   setTimeout(() => {
			  setIsLoading(false)
			  toast.success('User details saved', {
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
		   },2000)
		}
	 }
	return (
	  <div className="profile-screen global-container">
		<Toaster position="bottom-center"/>
        <div className="header">
          <Image loading="lazy" className="logo" src={logo} alt=""/>
		  <h2 className="primary-text back" onClick={() => {
			router.push('/')
		  }}>Back To Home</h2>
		 </div>
		 <div className="checkout-form">
			<h4>Your Profile</h4>
			<FilledButton classN="btn" title="Order History" click={()=>{
				router.push('/orders');
			}}/>
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
			  <FilledButton title="Save user details" click={() => {
				saveUser();
			  }}/>
			  {isLoading && <p className="save">Saving your details...</p>}
			</div>
		 </div>
	  </div>	
	)
}


export default ProfileScreen;