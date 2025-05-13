import React from 'react';
import axios from 'axios';
import DriverProfile from '../assets/DriverProfile.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FinishRide = ({ rideData, setFinishRidePanel }) => {
    const token = localStorage.getItem('token');
    const baseURL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate()

    const handleFinishRide = async () => {
        try {
            const response = await axios.post(
                `${baseURL}/ride/endride`,
                { rideId: rideData._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response of FinishRide", response);
            
            if (response.status === 200) {
                alert("Ride ended successfully!");
                setFinishRidePanel(false);
                navigate('/captain-home')

            }
        } catch (error) {
            console.error("Error ending the ride:", error);
            alert("Failed to end the ride. Please try again.");
        }
    };

    return (
        <div>
            <h1 className='flex justify-start py-3 items-center text-3xl'>Finish The Ride</h1>
            <div className="flex items-center justify-between px-3 py-4 border-b-2 bg-yellow-300">
                <div>
                    <img src={DriverProfile} alt="Driver" className="w-16 h-16 rounded-full object-cover" />
                </div>
                <h1 className="text-lg font-semibold">{rideData?.userId.fullname.firstname + " " + rideData?.userId.fullname.lastname }</h1>
                <div className="text-right">
                    <h4 className="text-xl font-bold text-green-600">2.5 KM</h4>
                </div>
            </div>
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-user-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>PickUp Location</h1>
                    <h3>{rideData?.pickupLocation}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-map-pin-2-fill"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>Destination Location</h1>
                    <h3>{rideData?.destinationLocation}</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className='flex flex-row justify-left gap-4 p-2'>
                <h5 className='flex justify-center items-center'><i className="ri-money-rupee-circle-line"></i></h5>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>&#8377;{rideData?.fare}</h1>
                    <h3>Cash Cash</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <button
                onClick={handleFinishRide}
                className="w-full bg-green-400 py-2 font-semibold rounded-xl mt-2 flex justify-center"
            >
                Finish Ride
            </button>
            <p className='text-red-500 text-sm'>Click On Finish Ride If You Have Completed The Payment</p>
            <button
                onClick={() => setFinishRidePanel(false)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
                Cancel
            </button>
        </div>
    );
};

export default FinishRide;