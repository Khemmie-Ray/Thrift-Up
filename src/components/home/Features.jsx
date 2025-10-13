import React from 'react'
import fImg from '../../assets/1.svg'
import fImg2 from '../../assets/2.svg'
import fImg3 from '../../assets/3.svg'

const Features = () => {

  return (
    <section className='hero-section mb-10'>
        <div className="flex items-center flex-col text-center">
        <h2 className="lg:text-[36px] md:text-[36px] text-[24px] font-[600] border-b-3 border-primary">
        Features of ThriftChain
        </h2>
        <p className="w-[100%] mx-auto lg:w-[60%] md:w-[60%]">
        Below are the key features of ThriftChain
        </p>
      </div>
      <div className='w-[90%] mx-auto flex justify-between flex-col lg:flex-row md:flex-row my-12 relative'>
        <div className='w-[100%] lg:w-[45%] md:w-[45%] mb-4'>
        <img src={fImg} alt="" className='w-[100%]' />
        </div>
        <div className='w-[100%] lg:w-[52%] md:w-[52%] self-center mb-4'>
            <h2 className='lg:text-[36px] md:text-[36px] text-[24px] font-[600]'>Customizable Savings Modules</h2>
            <p className='text-[18px]'>Choose from a variety of savings modules tailored to your goals. Whether it’s daily, weekly, or goal-based savings, the platform adapts to your financial plans with ease and flexibility.</p>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row md:flex-row justify-between my-12'>
        <div className='w-[90%] mx-auto lg:w-[42%] md:w-[42%] lg:m-auto md:m-auto mb-4 lg:mb-auto md:mb-auto order-2 lg:order-1 md:order-1'>
            <h2 className='lg:text-[36px] md:text-[36px] text-[24px] font-[600]'>Secure Savings Wallet</h2>
            <p className='text-[18px]'>Safeguard your funds with a secure and user-friendly digital wallet. Your savings are protected with advanced encryption and blockchain technology.</p>
        </div>
        <div className='w-[100%] pl-4 lg:pl-0 md:pl-0 lg:w-[45%] md:w-[45%] mb-4 order-1 lg:order-2 md:order-2'>
        <img src={fImg2} alt="" className='w-[100%]' />
        </div>
      </div>
      <div className='w-[90%] mx-auto flex justify-between flex-col lg:flex-row md:flex-row my-12'>
        <div className='w-[100%] lg:w-[45%] md:w-[45%] mb-4'>
        <img src={fImg3} alt="" className='w-[100%]' />
        </div>
        <div className='w-[100%] lg:w-[52%] md:w-[52%] self-center mb-4'>
            <h2 className='lg:text-[36px] md:text-[36px] text-[24px] font-[600]'>Personalised and group dashboard</h2>
            <p className='text-[18px]'>The user dashboard offers a seamless view of your activities, providing real-time insights into your savings, deposits, and progress toward financial goals.</p>
        </div>
      </div>
    </section>
  )
}

export default Features