import React from "react";
import "./DesktopHeader.component.css";
import Image from "next/image";
import logo from "../../../../public/assets/sure-reads-logo.svg";
import cartIcon from "../../../../public/assets/cart-icon-outlined-black.svg";
import profileIcon from "../../../../public/assets/profile-icon-outlined-black.svg";
import Navbar from "@/app/common/Navbar/Navbar";
import navItems from "@/app/statics/navItems";

export interface DesktopHeaderProps {
  children?: React.ReactNode;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = () => {
  return (
    <div className="desktop-header global-container">
      <Image className="header-logo" priority src={logo} alt="" />
      <div className="navbar-items">
        <Navbar items={navItems} />
      </div>
      <div className="right-col-items">
        <Image className="icons cart" src={cartIcon} alt="" />
        <Image className="icons" src={profileIcon} alt="" />
      </div>
    </div>
  );
};

export default DesktopHeader;
