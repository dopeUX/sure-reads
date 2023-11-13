import AppLayout from "@/app/layouts/AppLayout/AppLayout.component";
import React from "react";
import "./HomeScreen.component.css";
import DesktopHeader from "@/app/layouts/DesktopHeader/DesktopHeader.component";

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <div className="home-screen">
      <DesktopHeader />
    </div>
  );
};

export default HomeScreen;
