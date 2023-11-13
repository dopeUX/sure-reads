import React from "react";
import "./AppLayout.component.css";

export interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <div className="app-screen">{children}</div>;
};

export default AppLayout;
