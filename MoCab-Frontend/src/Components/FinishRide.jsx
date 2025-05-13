import React from 'react'
import DriverProfile from '../assets/DriverProfile.jpg'
import { Link } from 'react-router-dom'
const FinishRide = (props) => {
    const submitHandeler = (e) => {
        e.prevendDefault()
    }
    return (
        <div>
            <h1 className='flex justify-start py-3 items-center text-3xl'>Finish The Ride</h1>
            <div className="flex items-center justify-between px-3 py-4 border-b-2 bg-yellow-300">
                <div>
                    <img src={DriverProfile} alt="Driver" className="w-16 h-16 rounded-full object-cover" />
                </div>
                <h1 className="text-lg font-semibold">{props.rideData?.userId.fullname.firstname + " " + props.rideData?.userId.fullname.lastname }</h1>
                <div className="text-right">
                    <h4 className="text-xl font-bold text-green-600">2.5 KM</h4>
                </div>
            </div>
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-user-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>PickUp Location</h1>
                    <h3>{props.rideData?.pickupLocation}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-2-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>Destination Location</h1>
                    <h3>{props.rideData?.destinationLocation}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-money-rupee-circle-line"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>&#8377;{props.rideData?.fare}</h1>
                    <h3>Cash Cash</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
                <Link to='/captain-home' className='w-full bg-green-400 py-2 font-semibold rounded-xl mt-2 flex justify-center'
                >Finish Ride</Link>
                <p className='text-red-500 text-sm'>Click On Finish Ride If You Have Completed The Payment</p>
        </div>
    )
}

export default FinishRide