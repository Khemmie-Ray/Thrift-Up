import React from 'react'

const InProgress = () => {
  return (
    <div className='bg-black/50  w-[100%] h-screen flex justify-center items-center'>
        <div className='w-[90%] lg:w-[40%] md:w-[40%] bg-white p-4 rounded-2xl text-center mx-auto'>
        <img src="https://img.freepik.com/free-vector/hand-drawn-construction-background_23-2147735154.jpg?ga=GA1.1.770405697.1735080768&semt=ais_hybrid&w=740" alt="" className='object-cover h-[300px] w-[100%] object-center'/>
        <h3 className='text-[24px] font-bold '>Currently Under Development</h3>
        <p className='text-grey'>We’re working on something awesome -- Check back soon!</p>
        </div>
    </div>
  )
}

export default InProgress