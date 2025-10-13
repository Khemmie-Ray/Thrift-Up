import React from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillFunnelFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

const AssetOwner = () => {
  return (
    <div className="my-8 lg:px-8 md:px-8 px-4">
      <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
        <div className="bg-white rounded-2xl w-[100%] lg:w-[49%] md:w-[49%] p-4 mb-4">
          <p className="font-[500]">Assets Overview</p>
          <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 my-3">
            <p className="font-[500]">
              Total assets created by me <br />
              <span className="text-[12px] text-lightgray">4 assets</span>
            </p>
            <button className="bg-linear-to-r from-primary to-lilac font-[500] text-white py-3 px-6 mt-3 text-[12px] flex justify-center rounded-full hover:scale-105 items-center">
              <FaPlus className="mr-2" />
              List a new asset
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl w-[100%] lg:w-[49%] md:w-[49%] p-4 mb-4">
          <p className="font-[500]">Assets Overview</p>
          <div className="border border-gray-200 rounded-xl p-4 my-3">
            <p className="font-[500]">
              Total assets purchased
              <br />
              <span className="text-[12px] text-lightgray">4 assets</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-8 px-4">
        <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row mb-4 ">
          <h3 className="text-[18px] font-[600]">All Assets</h3>
          <div className="flex items-center">
            <div className="flex items-center border border-gray-200 p-3 px-8 rounded-full mr-2">
              <BsFillFunnelFill className="mr-2" />
              <input type="text" placeholder="Filter by assets created by me" />
              <RiArrowDropDownLine className="ml-2" />
            </div>
            <p>View All</p>
          </div>
        </div>
        <div lassName="flex justify-between items-center flex-col lg:flex-row md:flex-row">
          <div className="text-[12px] border border-[#DADADF] rounded-2xl py-6 px-4 shadow-lg w-[100%] lg:w-[32%] md:w-[32%] mb-3">
            <img src="https://img.freepik.com/free-photo/png-chocolate-bars-isolated-white-background_185193-165937.jpg?ga=GA1.1.770405697.1735080768&semt=ais_hybrid&w=740" alt="" className="w-[100%] h-[200px] rounded-2xl object-cover object-center"/>
            <h3 className="text-[16px] font-[600] mb-3 mt-5">
              Gold Investment Package
            </h3>
            <p>Description: Secure your wealth with 99.9% pure gold bars.</p>
            <p className="text-grey flex justify-between items-center my-2">
              {" "}
              Quantity Available: <span>500 units</span>
            </p>
            <p className="text-grey flex justify-between items-center my-2">
              {" "}
              Discount:
              <span>5% off for instant purchase.</span>
            </p>
            <p className="text-grey flex justify-between items-center my-2">
              {" "}
              Price:
              <span>$6,800 per slot</span>
            </p>
            <button className="border border-grey font-[500] w-[100%] py-3 px-6 mt-4 text-[12px] flex justify-center rounded-full hover:scale-105 items-center">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetOwner;
