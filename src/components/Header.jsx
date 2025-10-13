import React, { useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.svg";
import { Divide as Hamburger } from "hamburger-react";
import { useScroll, motion, useSpring } from "framer-motion";
import { useAppKit } from "@reown/appkit/react";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { open } = useAppKit();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="py-8 bg-gradient-to-r from-[#E9E3FF] to-white sticky top-0 z-40">
      <motion.div
        className=" fixed top-0 left-0 right-0 bg-primary origin-[0%] h-[5px] z-[42]"
        style={{ scaleX }}
      />
      <nav className="w-[90%] mx-auto hidden lg:flex md:flex  items-center justify-between text-white text-[16px] font-[500] lg:flex-row md:flex-row flex-col">
        <img src={logo} alt="" />
        <div>
          <NavLink to="/" className="text-lilac mr-6 font-[500]">
            Home
          </NavLink>
          <a href="#about" className="text-lilac mb-4 font-[500]">
            About Us
          </a>
        </div>
        <button
          onClick={() => open()}
          className="bg-linear-to-r from-primary to-lilac py-4 px-8 rounded-full font-[500] "
        >
          Connect Wallet
        </button>
        {/* <w3m-button /> */}
      </nav>
      <nav className="w-[90%] mx-auto lg:hidden md:hidden items-center justify-between text-white font-[500] flex">
        <img src={logo} alt="Thriftchain logo" />
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color="#9346FF"
          direction="left"
        />
        {isOpen && (
          <div className="p-8 py-12 h-[60vh] w-[100%] absolute top-20 left-0 bg-white z-50 flex flex-col items-center">
            <nav>
              <NavLink to="/" className="text-lilac mb-4 font-[500]">
                Home
              </NavLink>
              <a href="#about" className="text-lilac mb-4 font-[500]">
                About Us
              </a>
            </nav>
            <button
              className="bg-linear-to-r from-primary to-lilac py-4 px-8 rounded-full text-[16px] font-[500] "
              onClick={() => open()}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
