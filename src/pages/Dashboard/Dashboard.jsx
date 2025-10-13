import React, { useState } from "react";
import { DashNav, MobileDashNav } from "../../components/shared/Reuse";
import Thrifter from "../../components/dashboard/Thrifter";
import AssetOwner from "../../components/dashboard/AssetOwner";
import { Button } from "@headlessui/react";
import RegisterModal from "../../components/dashboard/RegisterModal";
// import { useThriftData } from "../../context/ThriftContextProvider";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("thrifter");
  // const { allGroup, groupUser, singleUser } = useThriftData()
  // console.log(allGroup, groupUser, singleUser, "Wahala")

  const selectedStyle = "bg-[#6138FE] text-white";
  const defaultStyle = "text-[#5E6074]";

  return (
    <main className="">
      <MobileDashNav>Overview</MobileDashNav>
      <DashNav>Overview</DashNav>
      <div className="bg-lilac text-white p-3 flex justify-between items-center">
        <p className="">
          If you are a new user, get started on ThriftChains by Registering.{" "}
          {<RegisterModal />}
        </p>
      </div>
      <section className="flex justify-between my-8 lg:px-8 md:px-8 px-4 items-center flex-col lg:flex-row md:flex-row">
        <div className="mb-3">
          <h2 className="lg:text-[28px] md:text-[28px] text-[20px] font-[600]">
            Hello
          </h2>
          <p className="text-grey">
            Here you can manage all your savings and contributions
          </p>
        </div>
        <div className="bg-[#EFEBFF] rounded-full lg:w-[40%] md:w-[40%] w-[100%] flex items-center justify-between mb-3">
          <Button
            className={`px-4 py-3 rounded-full focus:outline-none ${
              selectedTab === "thrifter" ? selectedStyle : defaultStyle
            }`}
            onClick={() => setSelectedTab("thrifter")}
          >
            Thrifter Dashboard
          </Button>
          <Button
            className={`px-4 py-3 rounded-full focus:outline-none ${
              selectedTab === "assetOwner" ? selectedStyle : defaultStyle
            }`}
            onClick={() => setSelectedTab("assetOwner")}
          >
            Asset Owner Dashboard
          </Button>
        </div>
      </section>
      {selectedTab === "thrifter" ? <Thrifter /> : <AssetOwner />}
    </main>
  );
};

export default Dashboard;
