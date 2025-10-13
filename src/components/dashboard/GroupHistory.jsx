import React from 'react'
import HistoryCard from './HistoryCard'

const GroupHistory = () => {
  return (
    <section className="flex justify-between px-8 my-4 flex-col lg:flex-row md:flex-row">
    <div className="my-8 rounded-xl bg-white px-4 py-8 lg:w-[49%] md:w-[49%] w-[100%]">
      <p className="font-[600] mb-4 text-[18px]">
        Ongoing Savings{" "}
        <span className="text-[12px] font-[500] text-primary">
          (Individual)
        </span>
      </p>
      <HistoryCard />
    </div>
  </section>
  )
}

export default GroupHistory