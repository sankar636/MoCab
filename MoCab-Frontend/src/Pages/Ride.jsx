import React, { useEffect } from 'react'
import Logo from '../assets/Logo1.png'
import Car from '../assets/Car.png'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


import { UserDataContext } from '../Context/UserContext.jsx'
import { SocketContext } from '../Context/SocketContext.jsx'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking.jsx'
const Ride = () => {


  const location = useLocation()
  // console.log(location);

  const rideData = location.state?.data


  const navigate = useNavigate()

  const { user } = useContext(UserDataContext)
  const { Socket } = useContext(SocketContext)

  useEffect(() => {
    const handleEndRide = (data) => {
      console.log(data);      
      navigate('/home');
    };

    Socket.on('ended-ride', handleEndRide);

    // Cleanup to avoid multiple registrations
    return () => {
      Socket.off('ended-ride', handleEndRide);
    };
  }, [Socket, navigate]);

  return (
    <div className='h-screen'>
      <div className='h-1/2 w-screen relative overflow-hidden'>
        <img src={Logo} alt="MoCaB" className='w-24 fixed left-1 top-1' />
        <Link to='/home' className='absolute bg-white h-10 w-10 right-3 top-3 flex justify-center items-center text-2xl rounded-full'>
          <i className="ri-home-9-line"></i>
        </Link>
        <div className='h-screen w-screen'>
          <LiveTracking  className='h-full w-full object-cover'/>
        </div>
      </div>
      <div className='h-1/2 px-2'>
        <div className='flex flex-row justify-between items-center p-4 relative'>
          <div className='flex justify-center items-center'>
            <img src={Car} alt="Car" className='h-20' />
          </div>
          <div className='flex flex-col items-end'>
            <h3 className='font-semibold'>{rideData?.driverId.fullname.firstname + " " + rideData?.driverId.fullname.lastname}</h3>
            <h1 className='font-bold'>{rideData?.driverId.vehicle.plate}</h1>
            <h4 className='capitalize'>Color: {rideData?.driverId.vehicle.color + " " + rideData?.driverId.vehicle.vehicleType}</h4>
            {/* <h1>Capacity - <span className='font-bold'>4</span></h1> */}
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
        <div className='flex flex-row justify-left gap-4 p-2'>
          <h5 className='flex justify-center items-center'><i className="ri-map-pin-user-fill"></i></h5>
          <div className='flex flex-col'>
            <h1 className='font-semibold'>Destination</h1>
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
        <button className='w-full mt-2 bg-green-400 py-2 font-semibold rounded-full'
        >Make A Payment</button>
      </div>
    </div>
  )
}

export default Ride