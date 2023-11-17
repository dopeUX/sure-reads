'use client';
import React, { useRef } from "react";
import "./DesktopHeader.component.css";
import Image from "next/image";
import logo from "../../../../public/assets/sure-reads-logo.svg";
import cartIcon from "../../../../public/assets/cart-icon-outlined-black.svg";
import profileIcon from "../../../../public/assets/profile-icon-outlined-black.svg";
import menuIcon from "../../../../public/assets/menu.svg";
import Navbar from "@/app/common/Navbar/Navbar";
import navItems from "@/app/Statics/navItems";
import { useRouter } from "next/navigation";
import { extraNavItems } from "@/app/Statics/navItems";

export interface DesktopHeaderProps {
  children?: React.ReactNode;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = () => {
  const router = useRouter();
  const mobileNavRef:any = useRef();
  const mobileItems = [...navItems, ...extraNavItems];
  return (
    <div className="desktop-header">
      <div ref={mobileNavRef} className="mobile-nav">
        <div className="content">
          <div className="nav-items">
           <Navbar items={mobileItems}/>
          </div>
          <div className="close" onClick={() => {
          mobileNavRef.current.style.animation = 'up cubic-bezier(0.77, 0, 0.175, 1) .5s forwards'
          }}></div>
        </div>
      </div>
      <Image className="header-logo" priority src={logo} alt="" />
      <div className="navbar-items">
        <Navbar items={navItems} />
      </div>
      <div className="right-col-items">
        <Image className="icons cart" src={cartIcon} alt="" onClick={() => {
           router.push('/cart');
        }}/>
        <Image className="icons" src={profileIcon} alt="" onClick={() => {
          router.push('/profile');
        }}/>
        <Image className="icons menu" src={menuIcon} alt="" onClick={() => {
          // router.push('/profile');
          mobileNavRef.current.style.animation = 'slide-dow cubic-bezier(0.77, 0, 0.175, 1) .5s forwards'
          // mobileNavRef.current.style.top = 0;
        }}/>
      </div>
    </div>
  );
};

export default DesktopHeader;
