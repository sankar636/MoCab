import React from 'react'
import DriverProfile from '../assets/DriverProfile.jpg'


const RidePopUp = (props) => {
    console.log("RidePopUp", props);
    
    return (
        <div>
            <h1
                className='absolute top-1 right-1/2 text-2xl font-semibold'
                onClick={() => {
                    props.setRidePopUpPanel(false)
                }}
            ><i className="ri-arrow-down-wide-line"></i>
            </h1>
            <h1 className='flex justify-start py-3 items-center text-3xl'>New Ride Available</h1>
            <div className="flex items-center justify-between px-3 py-4 border-b-2 bg-yellow-300">
                <div>
                    <img src={DriverProfile} alt="Driver" className="w-16 h-16 rounded-full object-cover" />
                </div>
                <h1 className="text-lg font-semibold">{props.ride?.userId.fullname.firstname}</h1>
                <div className="text-right">
                    <h4 className="text-xl font-bold text-green-600">2.5 KM</h4>
                </div>
            </div>
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-user-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>User Location</h1>
                    <h3>{props.ride?.pickupLocation}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-2-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>User Destination</h1>
                    <h3>{props.ride?.destinationLocation}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-money-rupee-circle-line"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>&#8377;{props.ride?.fare}</h1>
                    <h3>Cash Cash</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <button 
            onClick={async() => {
                props.setRidePopUpPanel(false)
                props.setConfirmRidePopUpPanel(true)
                await props.confirmRideByDriver(true)
            }}
            className='w-full bg-green-400 py-2 font-semibold rounded-xl mt-2'
            >Accept</button>
            <button 
            onClick={() => {
                props.setRidePopUpPanel(false)                
            }}
            className='w-full bg-red-500 py-2 font-semibold rounded-xl mt-2'
            >Ignore</button>
        </div>
    )
}

export default RidePopUp