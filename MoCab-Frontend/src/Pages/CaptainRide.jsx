import React, { useRef, useState } from 'react';
import Logo from '../assets/Logo1.png';
import { Link } from 'react-router-dom';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from '../Components/FinishRide';

const CaptainRide = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    const finishRideRef = useRef(null)

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRideRef.current, {
                transform: 'translate(0,0)'
            })
        } else {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-grow w-screen relative overflow-hidden">
                <img src={Logo} alt="MoCaB" className="w-24 absolute left-1 top-1 z-10" />

                <Link
                    to="/captain-home"
                    className="absolute bg-white h-10 w-10 right-3 top-3 flex justify-center items-center text-2xl rounded-full shadow-md hover:bg-gray-100 transition duration-300 z-10"
                >
                    <i className="ri-home-9-line"></i>
                </Link>

                <div className="h-full w-full">
                    <img
                        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                        alt="Captain Ride Animation"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div 
            className="h-1/5 px-4 py-3 bg-yellow-400 shadow-inner"
            onClick={() => {
                setFinishRidePanel(true)
            }}
            >
                <div className="flex justify-between items-center h-full">
                    <h1 className="text-xl font-semibold text-gray-800 ml-4">4 KM Away</h1>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300 shadow-lg">
                        Complete Ride
                    </button>
                </div>
            </div>
            <div ref={finishRideRef} className='bottom-0 w-full fixed translate-y-full h-full bg-gray-50 px-3 py-8 z-50'>
                <FinishRide setFinishRidePanel={setFinishRidePanel}/>
            </div>
        </div>
    );
};

export default CaptainRide;
