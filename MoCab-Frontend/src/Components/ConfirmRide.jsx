import React from 'react'
import Car from '../assets/Car.png';
import Auto from '../assets/Auto.webp';
import Bike from '../assets/Bike.webp';

const ConfirmRide = (props) => {
    // console.log("Props: ", props);
    
    // Function to Capitalize first letter 
    const imagess = {
        Car,
        Bike,
        Auto
    }
    function capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
    
    const vehicle = capitalizeFirst(props.vehicleType)
    const imgsrc = imagess[vehicle]
    // console.log(imgsrc);
    // console.log(typeof imgsrc);
    //The whole process is for ImageSrc setting

    // console.log(props.fare);
    // console.log(props.fare.vehicleType);
    const Amount = props.fare[props.vehicleType]
    
    // console.log(props.initiateRide());    
    
    return (
        <div>
            <h1
                className='absolute top-1 right-1/2 text-2xl font-semibold'
                onClick={() => {
                    props.setConfirmRidePanelOpen(false)
                }}
            ><i className="ri-arrow-down-wide-line"></i>
            </h1>
            <h1 className='w-full flex items-center justify-center'>Confirm Your Ride</h1>
            <div className='w-ful  flex justify-center items-centerl'>            
                <img src={imgsrc} className='h-25 w-20' alt='Car' />
            </div>
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-user-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>Pickup</h1>
                    <h3>{props.pick}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-2-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>Destination</h1>
                    <h3>{props.destination}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-money-rupee-circle-line"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>&#8377;{Amount}</h1>
                    <h3>Cash Cash</h3>
                </div>
            </div>
            <button 
            onClick={() => {
                props.setVehicleFound(true)
                props.setConfirmRidePanelOpen(false)
                props.initiateRide()
            }}
            className='w-full bg-green-400 py-2 font-semibold rounded-full'
            >Conform</button>
        </div>
    )
}

export default ConfirmRide