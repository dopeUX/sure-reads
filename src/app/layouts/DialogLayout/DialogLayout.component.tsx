import React from "react";
import "./DialogLayout.component.css";

export interface DialogLayoutProps {
  children?: React.ReactNode;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({}) => {
  return (
    <div className="dialog-layout index-99">
      <div className="dialog-content">
        <div className="dialog-layer-wrapper">
          <div className="wrapper-content">
            <h1></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogLayout;
