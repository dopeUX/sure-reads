'use client';
import AppLayout from "@/app/layouts/AppLayout/AppLayout.component";
import DesktopHeader from "@/app/layouts/DesktopHeader/DesktopHeader.component";
import React from "react";
import './AboutPageScreen.component.css';

export interface AboutPage {

}

const AboutPageScreen:React.FC<any> = () => {
	return (
	  <div className="about-page">
		<DesktopHeader/>
		<section className="about-content global-container">
		  <h1>About Sure reads.</h1>
		  <p>Version 1.0.0    Last Release : 17.11.2023</p>
		</section>
	  </div>
	)
}

export default AboutPageScreen