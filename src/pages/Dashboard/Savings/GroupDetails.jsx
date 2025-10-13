import React from "react";
import { DashNav } from "../../../components/shared/Reuse";
import { MobileDashNav } from "../../../components/shared/Reuse";
import { IoIosArrowBack } from "react-icons/io";
import { BiLayout } from "react-icons/bi";
import { useParams, Link, useLocation } from "react-router";
import useFetchGroups from "../../../hooks/useFetchGroups";
import tokenList from "../../../constants/tokenList.json";
import { formatUnits } from "ethers";
import Join from "../../../components/dashboard/Join";
import Loader from "../../../components/loaders/Loader";

const GroupDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { address } = location.state || {};
  const { groupThriftUser, loading } = useFetchGroups();
  if (!groupThriftUser || groupThriftUser.length === 0) {
    return <Loader />;
  }

  console.log(address)

  const selectedGoal = groupThriftUser?.find(
    (item) => item.goalId === Number(id)
  );

  const getTokenDecimals = (currencyAddress) => {
    const token = tokenList[currencyAddress];
    return token?.decimals || 18;
  };

  const getReadableAmount = (rawAmount, currencyAddress) => {
    const decimals = getTokenDecimals(currencyAddress);
    return parseFloat(formatUnits(rawAmount, decimals)).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );
  };

  const getReadableDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const goal = getReadableAmount(selectedGoal.goal, selectedGoal.currency);
  const saved = getReadableAmount(selectedGoal.saved, selectedGoal.currency);
  const percent =
    (parseFloat(selectedGoal.saved) / parseFloat(selectedGoal.goal)) * 100;
  const frequencyOptions = ["daily", "weekly", "bi-weekly", "monthly"];
  const start = getReadableDate(selectedGoal.startDate);
  const end = getReadableDate(selectedGoal.endDate);
  const decimals = getTokenDecimals(selectedGoal.currency);
  const rawGoal = parseFloat(formatUnits(selectedGoal.goal, decimals));
  const rawSaved = parseFloat(formatUnits(selectedGoal.saved, decimals));
  const rawLeft = rawGoal - rawSaved;

  const displayLeft = rawLeft.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <main className="">
      <DashNav>Details</DashNav>
      <MobileDashNav>Details</MobileDashNav>
      <div className="flex justify-between mt-4 lg:px-8 md:px-8 px-4 items-center flex-col lg:flex-row md:flex-row">
        <Link to="/dashboard/individual-savings" className="flex items-center">
          <IoIosArrowBack className="mr-3" /> Back
        </Link>
      </div>
      <section className="flex justify-between lg:px-8 md:px-8 px-4 items-center flex-col lg:flex-row md:flex-row">
        <div className="mb-3">
          <h2 className="lg:text-[28px] md:text-[28px] text-[20px] font-[600]">
            {selectedGoal.title}
          </h2>
        </div>
        <div className="flex items-center">
          <Join address={address} />
          <button className="bg-linear-to-r from-primary to-lilac font-[500] text-white py-3 px-6 mb-3 text-[12px] flex justify-center rounded-full hover:scale-105 items-center">
            Save
          </button>
          <button className="border rounded-full border-primary py-3 px-6 ml-3 text-[12px] mb-3">
            Withdraw
          </button>
        </div>
      </section>
      <section className="lg:px-8 md:px-8 px-4">
        <div className="w-[100%] flex justify-between flex-col lg:flex-row md:flex-row mt-6 flex-wrap">
          <div className="flex items-center lg:w-[32%] md:w-[32%] w-[100%] mb-3 bg-white rounded-2xl p-3">
            <div className="bg-[#EAE3F8] flex justify-center items-center p-1 text-primary rounded-full w-[40px] h-[40px] text-2xl mr-2">
              <BiLayout />
            </div>
            <div className="w-[75%]">
              <h3 className="text-[14px] font-[600]">Overview</h3>
              <p className="text-[14px] text-grey">
                ${saved} / <span>${goal}</span>
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={percent}
                style={{ "--progress": `${percent}%` }}
                className="w-full h-2 custom-range"
              />
              <p className="text-grey text-[12px]">
                {percent}% goal reached <span>Individual savings</span>
              </p>
            </div>
          </div>
          <div className="flex items-center lg:w-[32%] md:w-[32%] w-[100%] mb-3 bg-white rounded-2xl p-3">
            <div className="bg-[#EAE3F8] flex justify-center items-center p-1 text-primary rounded-full w-[40px] h-[40px] text-2xl mr-2">
              <BiLayout />
            </div>
            <div className="w-[75%]">
              <h3 className="text-[14px] font-[600]">
                Total amount contributed
              </h3>
              <p className="text-[14px] text-grey">${saved}</p>

              <p className="text-grey text-[12px]">
                You have contributed ${saved}
              </p>
            </div>
          </div>
          <div className="flex items-center lg:w-[32%] md:w-[32%] w-[100%] mb-3 bg-white rounded-2xl p-3">
            <div className="bg-[#EAE3F8] flex justify-center items-center p-1 text-primary rounded-full w-[40px] h-[40px] text-2xl mr-2">
              <BiLayout />
            </div>
            <div className="w-[75%]">
              <h3 className="text-[14px] font-[600]">Total amount left</h3>
              <p className="text-[14px] text-grey">${displayLeft}</p>

              <p className="text-grey text-[12px]">
                You have ${displayLeft} left to meet your goals
              </p>
            </div>
          </div>
          <div className="flex items-center lg:w-[32%] md:w-[32%] w-[100%] mb-3 bg-white rounded-2xl p-3">
            <div className="bg-[#EAE3F8] flex justify-center items-center p-1 text-primary rounded-full w-[40px] h-[40px] text-2xl mr-2">
              <BiLayout />
            </div>
            <div className="w-[75%]">
              <h3 className="text-[14px] font-[600]">Saving frequency</h3>
              <p className="text-[14px] text-grey capitalize">
                {frequencyOptions[selectedGoal.frequency]}
              </p>
            </div>
          </div>
          <div className="flex items-center lg:w-[32%] md:w-[32%] w-[100%] mb-3 bg-white rounded-2xl p-3">
            <div className="bg-[#EAE3F8] flex justify-center items-center p-1 text-primary rounded-full w-[40px] h-[40px] text-2xl mr-2">
              <BiLayout />
            </div>
            <div className="w-[75%]">
              <h3 className="text-[14px] font-[600]">Commencement Date</h3>
              <p className="text-[14px] text-grey">{start}</p>
            </div>
          </div>
          <div className="flex items-center lg:w-[32%] md:w-[32%] w-[100%] mb-3 bg-white rounded-2xl p-3">
            <div className="bg-[#EAE3F8] flex justify-center items-center p-1 text-primary rounded-full w-[40px] h-[40px] text-2xl mr-2">
              <BiLayout />
            </div>
            <div className="w-[75%]">
              <h3 className="text-[14px] font-[600]">Possible End Date</h3>
              <p className="text-[14px] text-grey">{end}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GroupDetails;
