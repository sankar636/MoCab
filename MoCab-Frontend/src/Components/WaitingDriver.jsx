import React from 'react'
import Car from '../assets/Car.png'
import DriverProfile from '../assets/DriverProfile.jpg'
const WaitingDriver = (props) => {
    // console.log("Driver Found Props: ", props);
    // const Amount = props.fare[props.vehicleType]

    return (
        <div>
            <h1
                className='absolute top-1 right-1/2 text-2xl font-semibold'
                onClick={() => {
                    props.setWaitingForDriver(false)
                }}
            ><i className="ri-arrow-down-wide-line"></i>
            </h1>
            <h1 className='w-full flex items-center justify-center text-sm font-semibold'>Waiting For Driver</h1>
            <div className='flex flex-row justify-between items-center p-4 relative'>
                <div className='flex justify-center items-center'>
                    <img src={Car} alt="Car" className='h-20' />
                    <div className='h-14 w-14 rounded-full absolute top-8 left-7'><img className='h-full w-full rounded-full' src={DriverProfile} alt="Profile" /></div>
                </div>
                <div className='flex flex-col items-end'>
                    <h3 className='font-semibold'>{props.rideConfirmByDriver?.driverId.fullname.firstname}</h3>
                    <h1 className='font-bold'>{props.rideConfirmByDriver?.driverId.vehicle.plate}</h1>
                    <h4>Color: {props.rideConfirmByDriver?.driverId.vehicle.color}</h4>
                    <h1>Capacity - <span className='font-bold'>{props.rideConfirmByDriver?.driverId.vehicle.capacity}</span></h1>
                </div>
            </div>
            <div className='flex flex-row justify-between gap-4 p-2'>
                <input
                    type="text"
                    placeholder='Send me Message'
                    className='bg-gray-200 pl-4 py-2 rounded-full'
                />
                <h1
                    className='text-2xl font-semibold border-black border-2 rounded-full w-10 flex justify-center items-center'
                ><i className="ri-phone-line"></i>
                </h1>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-user-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>Your Location</h1>
                    <h3>{props.rideConfirmByDriver?.pickupLocation}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-money-rupee-circle-line"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>&#8377;{props.rideConfirmByDriver?.fare}</h1>
                    <h3>Cash Cash</h3>
                </div>
            </div>
            <div className='flex flex-row justify-left gap-4 p-2'>
                {/* <h5 className='flex justify-center items-center'><i className="ri-money-rupee-circle-line"></i></h5> */}
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>{props.rideConfirmByDriver?.otp}</h1>
                    <h3>OTP: </h3>
                </div>
            </div>

        </div>
    )
}

export default WaitingDriver