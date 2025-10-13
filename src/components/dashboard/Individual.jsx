import React from "react";
import HistoryCard from "./HistoryCard";
import WithdrawCard from "./WithdrawCard";

const Individual = () => {
  return (
    <section className="flex justify-between px-8 my-4 flex-col lg:flex-row md:flex-row">
      <div className="mb-4 rounded-xl bg-white px-4 py-8 lg:w-[49%] md:w-[49%] w-[100%]">
        <p className="font-[600] mb-4 text-[18px]">
          Ongoing Savings{" "}
          <span className="text-[12px] font-[500] text-primary">
            (Individual)
          </span>
        </p>
        <HistoryCard />
      </div>
      <div className="bg-white rounded-lg py-8 px-4 mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
        <p className="font-[600] mb-4 text-[18px]">
          All completed savings
          <span className="text-[12px] font-[500] text-primary">
            (Individual)
          </span>
        </p>
        <WithdrawCard />
      </div>
    </section>
  );
};

export default Individual;
