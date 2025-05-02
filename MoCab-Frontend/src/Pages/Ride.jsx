import React from 'react'
import Logo from '../assets/Logo1.png'
import Car from '../assets/Car.png'
import { Link } from 'react-router-dom'
const Ride = () => {

  return (
    <div className='h-screen'>
      <div className='h-1/2 w-screen relative overflow-hidden'>
        <img src={Logo} alt="MoCaB" className='w-24 fixed left-1 top-1' />
        <Link to='/home' className='absolute bg-white h-10 w-10 right-3 top-3 flex justify-center items-center text-2xl rounded-full'>
          <i className="ri-home-9-line"></i>
        </Link>
        <div className='h-screen w-screen'>
          <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" className='h-full w-full object-cover' />
        </div>
      </div>
      <div className='h-1/2 px-2'>
        <div className='flex flex-row justify-between items-center p-4 relative'>
          <div className='flex justify-center items-center'>
            <img src={Car} alt="Car" className='h-20' />
          </div>
          <div className='flex flex-col items-end'>
            <h3 className='font-semibold'>Sankar</h3>
            <h1 className='font-bold'>OS01P2050</h1>
            <h4>Black SUV</h4>
            {/* <h1>Capacity - <span className='font-bold'>4</span></h1> */}
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
        <div className='flex flex-row justify-left gap-4 p-2'>
          <h5 className='flex justify-center items-center'><i className="ri-map-pin-user-fill"></i></h5>
          <div className='flex flex-col'>
            <h1 className='font-semibold'>Driver Location</h1>
            <h3>Patia</h3>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
        <div className='flex flex-row justify-left gap-4 p-2'>
          <h5 className='flex justify-center items-center'><i className="ri-money-rupee-circle-line"></i></h5>
          <div className='flex flex-col'>
            <h1 className='font-semibold'>&#8377;190.5</h1>
            <h3>Cash Cash</h3>
          </div>
        </div>
        <button className='w-full mt-2 bg-green-400 py-2 font-semibold rounded-full'
        >Make A Payment</button>
      </div>
    </div>
  )
}

export default Ride