import React from "react";
import './InputBox.css';
import searchIcon from '../../../../public/assets/search.svg';
import Image from "next/image";

export interface InputBoxProps {
  holderText: string;
  classN?: string;
  icon: boolean;
  inputClass?: string;
  type?: string;
  value?: string;
}

const InputBox:React.FC<InputBoxProps> = ({holderText, classN = '', icon, inputClass, type, value}) => {
	return (
	  <div className={`input-box ${classN}`}>
       {icon && <Image className="image" src={searchIcon} alt=""/>}
       <input type={type} value={value} className={inputClass} title="tt" placeholder={holderText}/>
	  </div>	
	)
} 

export default InputBox;