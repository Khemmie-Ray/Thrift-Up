import React, { useState } from "react";
import { Button } from "@headlessui/react";
import { PiVaultBold } from "react-icons/pi";
import { PiEmptyBold } from "react-icons/pi";

const WithdrawCard = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="w-[100%] flex justify-between items-center flex-col mt-6">
      {/* <div className="flex items-center lg:w-[73%] md:w-[73%] w-[100%] mb-3">
        <div className="bg-[#EAE3F8] flex justify-center items-center p-3 text-primary rounded-full w-[60px] h-[60px] text-2xl mr-2">
          <PiVaultBold />
        </div>
        <div className="w-[75%]">
          <h3 className="text-[14px] font-[600]">
            Savings to go to Medical school
          </h3>
          <p className="text-[14px] text-grey">
            $2,000/ <span>$2,000</span>
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-2 custom-range"
          />
          <p className="text-grey text-[12px]">
          View Details
          </p>
        </div>
      </div>
      <Button className="border rounded-full border-primary p-2 text-[12px] lg:w-[25%] md:w-[25%] w-[100%] mb-3">
        Withdraw
      </Button> */}
      <PiEmptyBold  className="text-4xl"/>
      <p>No completed savings yet!</p>
    </div>
  );
};

export default WithdrawCard;
