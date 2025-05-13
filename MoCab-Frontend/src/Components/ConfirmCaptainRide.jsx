import React, { useState } from 'react';
import DriverProfile from '../assets/DriverProfile.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmCaptainRide = (props) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const token = localStorage.getItem('token'); // Ensure token is retrieved
    const baseURL = import.meta.env.VITE_BASE_URL; // Ensure baseURL is retrieved

    const submitHandeler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${baseURL}/ride/start`, {
                params: { otp: otp, rideId: props.ride?._id }, // Ensure `props.ride` is not undefined
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                props.setRidePopUpPanel(false);
                props.setConfirmRidePopUpPanel(false);
                navigate('/captain-ride', { state: { ride: props.ride } }); // Pass `props.ride` safely // This pass ride data in state which is accessed in CaptainRide component
            }
        } catch (error) {
            console.error('Error While Starting The Ride:', error);
            alert('Failed to start the ride. Please check the OTP or try again.');
        }
    };

    return (
        <div>
            <h1
                className="absolute top-1 right-1/2 text-2xl font-semibold"
                onClick={() => {
                    props.setConfirmRidePopUpPanel(false);
                }}
            >
                <i className="ri-arrow-down-wide-line"></i>
            </h1>
            <h1 className="flex justify-start py-3 items-center text-3xl">New Ride Available</h1>
            <div className="flex items-center justify-between px-3 py-4 border-b-2 bg-yellow-300">
                <div>
                    <img src={DriverProfile} alt="Driver" className="w-16 h-16 rounded-full object-cover" />
                </div>
                <h1 className="text-lg font-semibold">SankarShan</h1>
                <div className="text-right">
                    <h4 className="text-xl font-bold text-green-600">2.5 KM</h4>
                </div>
            </div>
            <div className="flex flex-row justify-left gap-4 p-2">
                <h5 className="flex justify-center items-center">
                    <i className="ri-map-pin-user-fill"></i>
                </h5>
                <div className="flex flex-col">
                    <h1 className="font-semibold">Driver Location</h1>
                    <h3>Bhubaneswar</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className="flex flex-row justify-left gap-4 p-2">
                <h5 className="flex justify-center items-center">
                    <i className="ri-map-pin-2-fill"></i>
                </h5>
                <div className="flex flex-col">
                    <h1 className="font-semibold">User Location</h1>
                    <h3>Cuttack</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div className="flex flex-row justify-left gap-4 p-2">
                <h5 className="flex justify-center items-center">
                    <i className="ri-money-rupee-circle-line"></i>
                </h5>
                <div className="flex flex-col">
                    <h1 className="font-semibold">&#8377;190.5</h1>
                    <h3>Cash Cash</h3>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <form onSubmit={submitHandeler}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                />
                <button
                    type="submit"
                    className="w-full bg-green-400 py-2 font-semibold rounded-xl mt-2 flex justify-center"
                >
                    Confirm
                </button>
                <button
                    type="button"
                    onClick={() => {
                        props.setRidePopUpPanel(false);
                        props.setConfirmRidePopUpPanel(false);
                    }}
                    className="w-full bg-red-500 py-2 font-semibold rounded-xl mt-2"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ConfirmCaptainRide;