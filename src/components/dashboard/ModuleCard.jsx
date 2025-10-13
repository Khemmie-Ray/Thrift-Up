import React from 'react'
import { MdArrowOutward } from "react-icons/md";
import { NavLink } from 'react-router';
import { AiOutlinePlus } from "react-icons/ai";

const ModuleCard = () => {
  return (
    <div className="bg-white lg:w-[48%] md:w-[48%] w-[100%] rounded-lg p-6 shadow-xl mb-3">
    <p className="text-[12px] font-[500]">Total Individual Savings</p>
    <h3 className="text-[18px] font-[600]">#0</h3>
    <p className="text-[12px] flex">
      From last month{" "}
      <span className="text-green-600 flex items-center ml-3">
        <MdArrowOutward />
        0%
      </span>
    </p>
    <NavLink
      to="/dashboard/individual-savings/create-module"
      className="bg-linear-to-r from-primary to-lilac font-[500] text-white p-3 mt-3 text-[12px] flex justify-center rounded-full hover:scale-105 items-center"
    >
      <AiOutlinePlus className="mr-2" /> Create New Module
    </NavLink>
  </div>
  )
}

export default ModuleCard