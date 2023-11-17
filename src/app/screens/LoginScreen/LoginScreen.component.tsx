"use client";
import React, { useState } from "react";
import './LoginScreen.component.css';
import Image from "next/image";
import logo from '../../../../public/assets/sure-reads-logo.svg';
import tree from '../../../../public/assets/tree.svg';
import InputBox from "@/app/common/InputBox/InputBox";
import FilledButton from "@/app/common/FilledButton/FilledButton";
import { useRouter } from "next/navigation";
import currentUser from "@/app/Statics/currentUser";
export interface LoginScreenProps {

}

const saveUser = () => {
	localStorage.setItem('isLoggedIn', "true");
	localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

const LoginScreen:React.FC<LoginScreenProps> = ({}) => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter();
	return (
	  <div className="login-screen global-container">
        <div className="login-screen-wrapper">
			<Image loading="lazy" className="logo" src={logo} alt="logo"/>
		    <section className="login-content">
			<Image loading="lazy" className="tree-img" src={tree} alt="tree-img"/>
		    <div className="divider"></div>
			<div className="login-form">
				<h2>Sign in with your registered email</h2>
				<p>Email</p>
				<InputBox holderText="" value='testuser@gmail.com' icon={false} inputClass='input'/>
				<p>Password</p>
				<InputBox holderText="" type='password' value="1234" icon={false} inputClass='input'/>
				<FilledButton classN="button" title="Sign In" click={() => {
					setIsLoading(true)
				    saveUser()
					setTimeout(()=>{
                      router.back();
					},2000)
				}}/>
				{isLoading && <p>Signing you in...</p> }
			</div>
		   </section>
		</div>
	  </div>
	)
}

export default LoginScreen;