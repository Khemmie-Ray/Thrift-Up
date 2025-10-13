import React from 'react'
import { DashNav } from '../../../components/shared/Reuse'
import { Button } from '../../../components/shared/Reuse'
import HistoryGroupCard from '../../../components/dashboard/HistoryGroupCard'
import GroupModuleCard from '../../../components/dashboard/GroupModuleCard'
import ProgressPie from '../../../components/dashboard/ProgressPie'
import { RxDotFilled } from "react-icons/rx";
import WithdrawCard from '../../../components/dashboard/WithdrawCard'
import { FaPlus } from "react-icons/fa";
import CreatedGroup from '../../../components/dashboard/CreatedGroup'

const GroupSavings = () => {
  const percentage = 70;

  return (
    <div>
    <DashNav>Group Module</DashNav>
    <section className="flex justify-between my-8 lg:px-8 md:px-8 px-4 items-center flex-col lg:flex-row md:flex-row">
      <div className="mb-3">
        <h2 className="lg:text-[28px] md:text-[28px] text-[20px] font-[600]">
          Hello
        </h2>
        <p>Here you can manage all Group savings</p>
      </div>
      <div className="">
        <Button className="bg-linear-to-r from-primary to-lilac font-[500] text-white py-3 px-6 mt-3 text-[12px] flex justify-center rounded-full hover:scale-105 items-center">
        Join a group with a code <FaPlus className='ml-2' />
        </Button>
      </div>
    </section>
    <section className="flex justify-between my-8 lg:px-8 md:px-8 px-4 items-center flex-col lg:flex-row md:flex-row">

      <div className="lg:w-[49%] md:w-[49%] w-[100%] mb-auto">
          <div className="rounded-xl bg-white px-4 py-8 mb-4">
        <p className="font-[600] mb-4 text-[18px]">
          Ongoing Savings{" "}
          <span className="text-[12px] font-[500] text-primary">
            (Group)
          </span>
        </p>
        <HistoryGroupCard />
        </div>
        <div className="rounded-xl bg-white px-4 py-8">
        <p className="font-[600] mb-4 text-[18px]">
        All groups created by you
        </p>
        <CreatedGroup />
        </div>
      </div>
      <div className="lg:w-[49%] md:w-[49%] w-[100%] mb-auto">
        <div className="flex justify-between flex-col lg:flex-row md:flex-row">
          <GroupModuleCard />
          <div className="bg-white lg:w-[48%] md:w-[48%] w-[100%] rounded-lg p-6 shadow-xl mb-3">
          <ProgressPie percentage={percentage} />
          <p className="font-[600] text-[14px] my-2">Overall Group Savings</p>
          <p className="flex items-center text-[12px]"><RxDotFilled className="text-primary text-xl mr-3"/> 70% goal met</p>
          <p className="flex items-center text-[12px]"><RxDotFilled className="text-lightgray text-xl mr-3"/> 30% goal left to be met</p>
          </div>
        </div>
        <div className="bg-white rounded-lg py-8 px-4 my-4">
        <p className="font-[600] mb-4 text-[18px]">
        All completed savings
          <span className="text-[12px] font-[500] text-primary">
            (Group)
          </span>
        </p>
        <WithdrawCard />
        </div>
      </div>
    </section>
  </div>
  )
}

export default GroupSavings