import React from "react";
import { NavLink } from "react-router";
import { AiOutlinePlus } from "react-icons/ai";
import { GoArrowDownLeft } from "react-icons/go";
import HistoryCard from "./HistoryCard";
import Notifications from "./Notifications";
import ModuleCard from "./ModuleCard";
import HistoryGroupCard from "./HistoryGroupCard";

const Thrifter = () => {
  return (
    <div className="flex justify-between px-8 my-4 flex-col lg:flex-row md:flex-row">
      <div className="lg:w-[49%] md:w-[49%] w-[100%] ">
        <p className="font-[600] mb-4 text-[18px]">Savings Overview </p>
        <div className="flex justify-between w-[100%] text-grey flex-col lg:flex-row md:flex-row">
         <ModuleCard />
          <div className="bg-white lg:w-[48%] md:w-[48%] w-[100%] rounded-lg p-6 shadow-xl mb-3">
            <p className="text-[12px] font-[500]">Total Group Savings</p>
            <h3 className="text-[18px] font-[600]">#0</h3>
            <p className="text-[12px] flex">
              From last month{" "}
              <span className="text-red-600 flex items-center ml-3">
                <GoArrowDownLeft />
                0%
              </span>
            </p>
            <NavLink
              to="/dashboard/group-savings/create-module"
              className="border border-primary text-primary font-[500] p-3 mt-3 text-[12px] flex justify-center rounded-full hover:scale-105 items-center"
            >
              <AiOutlinePlus className="mr-2" /> Create New Module
            </NavLink>
          </div>
        </div>
        <div className="my-8 rounded-xl bg-white px-4 py-8">
          <p className="font-[600] mb-4 text-[18px] flex justify-between items-center">
            Ongoing Savings <span className="text-[12px] font-[500] text-primary">View All</span>
          </p>
          <HistoryCard />
          <HistoryGroupCard />
        </div>
      </div>
      <div className="lg:w-[49%] md:w-[49%] w-[100%] mb-3">
        <p className="font-[600] mb-4 text-[18px] flex justify-between items-center">Notifications <span className="text-[12px] font-[500] text-primary">View All</span></p>
        <div className="bg-white rounded-xl">
          <Notifications />
          </div>
        </div>
    </div>
  );
};

export default Thrifter;
