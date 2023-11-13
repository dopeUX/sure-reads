"use client";
import AppLayout from "@/app/layouts/AppLayout/AppLayout.component";
import React from "react";
import "./HomeScreen.component.css";
import DesktopHeader from "@/app/layouts/DesktopHeader/DesktopHeader.component";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const name = useSelector((state: RootState) => {
    return state.AppReducer.name;
  });
  return (
    <div className="home-screen">
      <DesktopHeader />

      {name}
    </div>
  );
};

export default HomeScreen;
