import React, { useState } from "react";
import { MobileDashNav } from "../../../components/shared/Reuse";
import { DashNav } from "../../../components/shared/Reuse";
import GroupList from "../../../components/dashboard/GroupList";
import Individual from "../../../components/dashboard/Individual";

const AllSavings = () => {
  const [selectedTab, setSelectedTab] = useState("individual");

  const selectedStyle = "bg-[#6138FE] text-white";
  const defaultStyle = "text-[#5E6074]";

  return (
    <main>
      <MobileDashNav>All Savings</MobileDashNav>
      <DashNav>All Savings</DashNav>

      <section className="flex justify-between my-8 lg:px-8 md:px-8 px-4 items-center flex-col lg:flex-row md:flex-row">
        <div className="mb-3">
          <h2 className="lg:text-[28px] md:text-[28px] text-[20px] font-[600]">
            Hello Duchess
          </h2>
        </div>
        <div className="bg-[#EFEBFF] rounded-full lg:w-[40%] md:w-[40%] w-[100%] flex items-center justify-between mb-3">
          <button
            className={`px-4 py-3 rounded-full transition-all duration-300 ${
              selectedTab === "individual" ? selectedStyle : defaultStyle
            }`}
            onClick={() => setSelectedTab("individual")}
          >
            Individual Savings
          </button>
          <button
            className={`px-4 py-3 rounded-full transition-all duration-300 ${
              selectedTab === "group" ? selectedStyle : defaultStyle
            }`}
            onClick={() => setSelectedTab("group")}
          >
            Group Module
          </button>
        </div>
      </section>

      {selectedTab === "individual" ? <Individual /> : <GroupList />}
    </main>
  );
};

export default AllSavings;
