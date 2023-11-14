import React from "react";
import "./FilledButton.css";

export interface buttonProps {
  title: string;
  classN?: string;
  click?: any;
}

const FilledButton: React.FC<buttonProps> = ({ title, classN,click }) => {
  return <button className={classN} title={title} onClick={click}>{title}</button>;
};

export default FilledButton;
