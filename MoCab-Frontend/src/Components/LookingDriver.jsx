import React from 'react'
import Car from '../assets/Car.png'
const LookingDriver = (props) => {
    console.log("Props: ", props);    
  return (
        <div>
            <h1
                className='absolute top-1 right-1/2 text-2xl font-semibold'
                onClick={() => {
                    props.setVehicleFound(false)
                }}
            ><i className="ri-arrow-down-wide-line"></i>
            </h1>
            <h1 className='w-full flex items-center justify-center'>Looking For Driver</h1>
            <div className='w-ful  flex justify-center items-centerl'>            
                <img src={Car} className='h-25 w-20' alt={Car} />
            </div>
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-user-location-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>Your Location</h1>
                    <h3>Bhubaneswar</h3>
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
        </div>
    )
}

export default LookingDriver
