import React from "react";
import "./FilledButton.css";

export interface buttonProps {
  title: string;
}

const FilledButton: React.FC<buttonProps> = ({ title }) => {
  return <button title={title}>{title}</button>;
};

export default FilledButton;
