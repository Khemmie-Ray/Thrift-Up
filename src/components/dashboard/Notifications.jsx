import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoNotificationsOffCircleSharp } from "react-icons/io5";

const Notifications = () => {
  return (
    <div className="w-[100%] flex justify-between items-center flex-col p-6 mb-4">
      {/* <div className="flex items-center lg:w-[73%] md:w-[73%] w-[100%] mb-3">
        <div className="bg-[#EAE3F8] flex justify-center items-center p-3 text-primary rounded-full w-[40px] h-[40px] text-xl mr-2">
          <IoNotificationsOutline />
        </div>
        <div className="w-[75%]">
          <h3 className="text-[14px] font-[600]">
            Savings to go to Medical school
          </h3>
          <p className="text-grey text-[12px]">
            90% goal reached <span>Individual savings</span>
          </p>
        </div>
      </div>
      <p className="text-grey text-[12px]">18hrs ago</p> */}
      <IoNotificationsOffCircleSharp  className="text-4xl"/>
      <p>Nothing yet</p>
    </div>
  );
};

export default Notifications;
