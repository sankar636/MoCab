import React from 'react';
import Car from '../assets/Car.png';
import Auto from '../assets/Auto.webp';
import Bike from '../assets/Bike.webp';

const VehiclePanel = (props) => {
    // console.log("Props: ", props);
    
    const vehicles = [
        {
            name: 'Car',
            image: Car,
            fare: props.fare.car,
            time: '2 min away',
            description: 'Compact Rides',
            seats: 6,
        },
        {
            name: 'Auto',
            image: Auto,
            fare: props.fare.auto,
            time: '2 min away',
            description: 'Affordable, Compact Rides',
            seats: 3,
        },
        {
            name: 'Bike',
            image: Bike,
            fare: props.fare.bike,
            time: '2 min away',
            description: 'Personal Experience',
            seats: 1,
        },
    ];
    
    return (
        <div>
            <h1 className='pb-3 font-semibold text-2xl'>Choose A Vehicle</h1>
            <h1 
            className='absolute top-1 right-1/2 text-2xl font-semibold'
            onClick={() => {
                props.setVehiclePanelOpen(false)
            }}
            ><i className="ri-arrow-down-wide-line"></i></h1>
            {vehicles.map((vehicle, index) => (
                <div
                    key={index}
                    className="flex p-3 mt-2 w-full items-center justify-between border-2 border-gray-300 hover:border-black rounded-xl transition duration-200"
                    onClick={() => {
                        props.setConfirmRidePanelOpen(true)
                        props.setVehiclePanelOpen(false)
                        props.setVehicleType(vehicle.name.toLowerCase())
                    }}
                >
                    <img className="h-[60px] w-[25%]" src={vehicle.image} alt={vehicle.name} />
                    <div className="w-1/2">
                        <h4 className="font-semibold">
                            {vehicle.name}{' '}
                            <span className="ml-1 text-gray-600">
                                <i className="ri-user-fill"></i> {vehicle.seats}
                            </span>
                        </h4>
                        <h5 className="text-sm font-medium">{vehicle.time}</h5>
                        <p className="text-sm font-light">{vehicle.description}</p>
                    </div>
                    <h1 className="w-[22%] text-2xl">&#8377;{vehicle.fare}</h1>
                </div>
            ))}
        </div>
    );
};

export default VehiclePanel;


/*
 <div>
    <h1 className='py-3 font-semibold text-2xl'>Choose A Vehicle</h1>
    <div className="flex p-3 mt-2 w-full items-center justify-between border-2 border-gray-300 hover:border-black rounded-xl">
        <img className='h-[60px] w-[25%]' src={Car} alt="Uber SUV" />
        <div className='w-1/2 '>
            <h4 className='font-semibold'>SUV<span><i className="ri-user-fill"></i>6</span></h4>
            <h5 className='text-sm font-medium'>2 min away</h5>
            <p className='text-sm font-light'>Compact Rides</p>
        </div>
        <h1 className='w-[22%] text-2xl'>&#8377;194.5</h1>
    </div>
    <div className="flex p-3 mt-2 w-full items-center justify-between border-2 border-gray-300 hover:border-black rounded-xl">
        <img className='h-[60px] w-[25%]' src={Auto} alt="Uber SUV" />
        <div className='w-1/2 '>
            <h4 className='font-semibold'>Auto<span><i className="ri-user-fill"></i>6</span></h4>
            <h5 className='text-sm font-medium'>2 min away</h5>
            <p className='text-sm font-light'>Affrodable, Compact Rides</p>
        </div>
        <h1 className='w-[22%] text-2xl'>&#8377;125</h1>
    </div>
    <div className="flex p-3 mt-2 w-full items-center justify-between border-2 border-gray-300 hover:border-black rounded-xl">
        <img className='h-[60px] w-[25%]' src={Bike} alt="Uber SUV" />
        <div className='w-1/2 '>
            <h4 className='font-semibold'>SUV<span><i className="ri-user-fill"></i>6</span></h4>
            <h5 className='text-sm font-medium'>2 min away</h5>
            <p className='text-sm font-light'>Persional Exprience</p>
        </div>
        <h1 className='w-[22%] text-2xl'>&#8377;90.5</h1>
    </div>
 </div>
*/