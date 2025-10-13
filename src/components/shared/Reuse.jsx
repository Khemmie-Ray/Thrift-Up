import React from "react";
import { MdBookmarkBorder, MdNotificationsNone } from "react-icons/md";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={`rounded-full font-[500] ${className}`}>
      {children}
    </button>
  );
};

export const DashNav = ({ children }) => {
  return (
    <div className="lg:flex md:flex hidden items-center justify-between p-6 bg-white sticky top-0">
      <h2 className="lg:text-[24px] md:text-[24px] text-[20px] font-[600]">
        {children}
      </h2>
      <div className="flex items-center">
        <div className="flex items-center mr-6 text-2xl">
          <MdBookmarkBorder className="mr-2"/>
          <MdNotificationsNone />
        </div>
        <div>
          <w3m-button />
        </div>
      </div>
    </div>
  );
};

export const MobileDashNav = ({ children }) => {
    return  <h2 className="lg:hidden md:hidden flex lg:text-[24px] p-6 bg-white md:text-[24px] text-[20px] font-[600]">
          {children}
        </h2>
  };


export const ContentTab = ({ tabs }) => {
  return (
    <TabGroup className='w-[40%]'>
    <TabList className="flex justify-between bg-[#EFEBFF] rounded-full">
      {tabs.map((tab, index) => (
        <Tab key={index} className="px-4 text-[#5E6074] p-4 focus:outline-none data-[selected]:bg-primary data-[selected]:text-white data-[selected]:rounded-full ">
          {tab.label}
        </Tab>
      ))}
    </TabList>
    <TabPanels className='absolute w-[100%]'>
      {tabs.map((tab, index) => (
        <TabPanel key={index} className="p-4">
          {tab.content} 
        </TabPanel>
      ))}
    </TabPanels>
  </TabGroup>
  );
};
