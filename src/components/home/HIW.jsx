import React from "react";
import { RiPencilLine } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { IoLogInOutline } from "react-icons/io5";

const HIW = () => {
  return (
    <section className="my-18 text-[18px] w-[90%] mx-auto" id="about">
      <div className="flex items-center flex-col text-center">
        <h2 className="lg:text-[36px] md:text-[36px] text-[24px] font-[600] border-b-3 border-primary">
          Super simple to get started
        </h2>
        <p className="w-[100%] mx-auto lg:w-[70%] md:w-[70%]">
          Get started on our website following the steps below
        </p>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-row mt-12 justify-between items-center">
        <div className="w-[100%] lg:w-[32%] md:w-[32%] bg-lightPurple rounded-xl p-6 border border-[#CEC1FF]/50 mb-4">
          <div className="bg-primary rounded-full p-4 text-white w-[60px] h-[60px] flex justify-center items-center text-[28px] mb-4">
            <RiPencilLine />
          </div>
          <h3 className="font-[600]">Create Your Account</h3>
          <p className="text-grey">
            Sign up with your email or connect your wallet to create a secure
            account tailored to your financial goals.
          </p>
        </div>
        <div className="w-[100%] lg:w-[32%] md:w-[32%] bg-lightPurple rounded-xl p-6 border border-[#CEC1FF]/50 mb-4">
          <div className="bg-primary rounded-full p-4 text-white w-[60px] h-[60px] flex justify-center items-center text-[28px] mb-4">
            <BsCalendarDate />
          </div>
          <h3 className="font-[600]">Set Your Savings Goal</h3>
          <p className="text-grey">
            Define what you want to achieve—whether it’s short-term savings or
            long-term rewards, we’ll help you get there.
          </p>
        </div>

        <div className="w-[100%] lg:w-[32%] md:w-[32%] bg-lightPurple rounded-xl p-6 border border-[#CEC1FF]/50 mb-4">
          <div className="bg-primary rounded-full p-4 text-white w-[60px] h-[60px] flex justify-center items-center text-[28px] mb-4">
            <IoLogInOutline />
          </div>
          <h3 className="font-[600]">Start Saving</h3>
          <p className="text-grey">
          Deposit funds, track your savings progress with real-time insights and analytics with your dashboard
          </p>
        </div>
      </div>
    </section>
  );
};

export default HIW;
