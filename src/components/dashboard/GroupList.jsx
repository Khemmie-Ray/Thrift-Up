import React from "react";
import HistoryGroupCard from "./HistoryGroupCard";
import WithdrawCard from "./WithdrawCard";

const GroupList = () => {
  return (
    <div className="flex justify-between my-8 lg:px-8 md:px-8 px-4 items-center flex-col lg:flex-row md:flex-row">
        <div className="rounded-xl bg-white px-4 py-8 mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
          <p className="font-[600] mb-4 text-[18px]">
            Ongoing Savings{" "}
            <span className="text-[12px] font-[500] text-primary">(Group)</span>
          </p>
          <HistoryGroupCard />
        </div>
      <div className="bg-white rounded-lg py-8 px-4 mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
        <p className="font-[600] mb-4 text-[18px]">
          All completed savings
          <span className="text-[12px] font-[500] text-primary">(Group)</span>
        </p>
        <WithdrawCard />
      </div>
    </div>
  );
};

export default GroupList;
