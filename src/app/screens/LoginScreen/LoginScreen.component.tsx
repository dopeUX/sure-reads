import React from "react";
import './LoginScreen.component.css';
import Image from "next/image";
import logo from '../../../../public/assets/sure-reads-logo.svg';
import tree from '../../../../public/assets/tree.svg';
import InputBox from "@/app/common/InputBox/InputBox";
import FilledButton from "@/app/common/FilledButton/FilledButton";
export interface LoginScreenProps {

}

const saveUser = () => {
	localStorage.setItem('isLoggedIn', 'true');
	const currentUser = {
	  firstName:'shreyash',
	  lastName:'fz',
	  email:'testuser1@gmail.com',
	  address:'Silicon Valley',
	  state:'Illinois',
	  pincode:'442401',
	  phone:'92752799272'	
	}
	localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

const LoginScreen:React.FC<LoginScreenProps> = ({}) => {
	return (
	  <div className="login-screen global-container">
        <div className="login-screen-wrapper">
			<Image className="logo" src={logo} alt="logo"/>
		    <section className="login-content">
			<Image className="tree-img" src={tree} alt="tree-img"/>
		    <div className="divider"></div>
			<div className="login-form">
				<h2>Sign in with your registered email</h2>
				<p>Email</p>
				<InputBox holderText="" icon={false} inputClass='input'/>
				<p>Password</p>
				<InputBox holderText="" type='password' icon={false} inputClass='input'/>
				<FilledButton classN="button" title="Sign In" click={() => {
				    if()
				}}/>
			</div>
		   </section>
		</div>
	  </div>
	)
}

export default LoginScreen;