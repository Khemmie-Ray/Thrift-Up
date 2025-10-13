import React from "react";
import logo from "../assets/f-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-dark py-10">
        <nav className="w-[90%] mx-auto flex items-center justify-between text-white font-[500] lg:flex-row md:flex-row flex-col">
      <img src={logo} alt="Thriftchain logo" className="lg:mb-0 md:mb-0 mb-4" />
      <div className="flex lg:flex-row md:flex-row flex-col items-center">
        <a href="#" className="lg:mr-6 md:mr-6 lg:mb-0 md:mb-0 mb-4">Terms</a>
        <a href="#" className="lg:mr-6 md:mr-6 lg:mb-0 md:mb-0 mb-4">Privacy</a>
        <a href="#" className="lg:mr-6 md:mr-6 lg:mb-0 md:mb-0 mb-4">Support</a>
        <a href="#" className="lg:mr-6 md:mr-6 lg:mb-0 md:mb-0 mb-4">About</a>
        <a href="#" className="lg:mr-6 md:mr-6 lg:mb-0 md:mb-0 mb-4">Resources</a>
        <a href="#" className="lg:mb-0 md:mb-0 mb-4">Contact</a>
      </div>
      </nav>
    </footer>
  );
};

export default Footer;
