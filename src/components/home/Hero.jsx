import React from "react";
import heroImg from "../../assets/hero.svg";
import token from "../../assets/naira.svg";
import token2 from "../../assets/usdc.svg";
import { motion } from "framer-motion";


const bouncingVariants = {
  bounce: {
    y: [0, -50, 0],
    x: [0, 20, -20, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-[#E9E3FF] to-white">
    <div className="hero-section relative py-10">
      <div className="w-[90%] mx-auto lg:w-[60%] md:w-[60%] text-center">
        <h1 className="lg:text-[50px] md:text-[50px] text-[34px] font-[700]">
          Redefining{" "}
          <span className="text-primary border-b-3 border-primary">
            Financial Growth{" "}
          </span>
          through Blockchain Technology
        </h1>
        <p className="text-[18px] text-grey font-semibold">
          Streamlined solutions to help you save smarter and achieve more.
        </p>
        <motion.img
          src={token}
          alt=""
          className="absolute w-10 top-10 left-10"
          variants={bouncingVariants}
          animate="bounce"
        />
        <motion.img
          src={token2}
          alt=""
          className="absolute w-12 top-20 right-10"
          variants={bouncingVariants}
          animate="bounce"
        />
        <motion.img
          src={token}
          alt=""
          className="absolute w-8 bottom-32 left-20"
          variants={bouncingVariants}
          animate="bounce"
        />
        <motion.img
          src={token2}
          alt=""
          className="absolute w-9 bottom-16 right-32"
          variants={bouncingVariants}
          animate="bounce"
        />
        <motion.img
          src={token}
          alt=""
          className="absolute w-10 bottom-80 right-32"
          variants={bouncingVariants}
          animate="bounce"
        />
        <motion.img
          src={token2}
          alt=""
          className="absolute w-12 bottom-10 left-1/4"
          variants={bouncingVariants}
          animate="bounce"
        />
        <div className="flex flex-col lg:flex-row md:flex-row justify-center my-6">
          <button className="bg-linear-to-r from-primary to-lilac py-4 px-8 rounded-full text-[16px] font-[500] text-white lg:mr-6 mb-4">
            Join as a thrifter
          </button>
          <button className="border border-primary  py-4 px-8 rounded-full text-[16px] font-[500] text-primary mb-4">
            Join as an asset owner
          </button>
        </div>
        <img src={heroImg} alt="" className="w-[100%] my-8" />
      </div>
    </div>
    </div>
  );
};

export default Hero;
