import React from 'react'
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { VscBookmark } from "react-icons/vsc";

const About = () => {
  return (
    <section className="my-18 text-[18px] w-[90%] mx-auto">
          <div className="flex items-center flex-col text-center">
            <h2 className="llg:text-[36px] md:text-[36px] text-[24px] font-[600] border-b-3 border-primary">
            Who is ThriftChain for?
            </h2>
            <p>
            Our Target Audience
            </p>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row mt-12 justify-between">
            <div className="w-[100%] lg:w-[32%] md:w-[32%] bg-lightPurple rounded-xl p-6 border border-[#CEC1FF]/50 mb-4">
              <div className="bg-primary rounded-full p-4 text-white w-[60px] h-[60px] flex justify-center items-center text-[28px] mb-4">
                <HiOutlineUser />
              </div>
              <h3 className="font-[600]">Thrifters (Individuals)</h3>
              <p className="text-grey">
              seeking to save for personal goals, participate in group savings, and potentially access loans within their trusted circles
              </p>
            </div>
            <div className="w-[100%] lg:w-[32%] md:w-[32%] bg-lightPurple rounded-xl p-6 border border-[#CEC1FF]/50 mb-4">
              <div className="bg-primary rounded-full p-4 text-white w-[60px] h-[60px] flex justify-center items-center text-[28px] mb-4">
                <VscBookmark />
              </div>
              <h3 className="font-[600]">Asset Owners</h3>
              <p className="text-grey">
              Partners seeking for users to purchase items and pay in thrift
              </p>
            </div>
    
            <div className="w-[100%] lg:w-[32%] md:w-[32%] bg-lightPurple rounded-xl p-6 border border-[#CEC1FF]/50 mb-4">
              <div className="bg-primary rounded-full p-4 text-white w-[60px] h-[60px] flex justify-center items-center text-[28px] mb-4">
                <HiOutlineUserGroup />
              </div>
              <h3 className="font-[600]">Thrifters (Groups)</h3>
              <p className="text-grey">
              Friends, families or communities looking to pool resources for shared objectives, such as purchasing assets or supporting community projects
              </p>
            </div>
          </div>
        </section>
  )
}

export default About