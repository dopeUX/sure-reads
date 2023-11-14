import React from "react";
import './InputBox.css';
import searchIcon from '../../../../public/assets/search.svg';
import Image from "next/image";

export interface InputBoxProps {
  holderText: string;
  classN: string;
}

const InputBox:React.FC<InputBoxProps> = ({holderText, classN = ''}) => {
	return (
	  <div className={`input-box ${classN}`}>
	   <Image className="image" src={searchIcon} alt=""/>
       <input title="tt" placeholder={holderText}/>
	  </div>	
	)
} 

export default InputBox;