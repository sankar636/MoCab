import React, { useRef, useState, useContext, useEffect } from 'react'
import Logo from '../assets/Logo1.png'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import CaptainDetails from '../Components/CaptainDetails.jsx'
import RidePopUp from '../Components/RidePopUp.jsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmCaptainRide from '../Components/ConfirmCaptainRide.jsx'
import axios from 'axios'

import { CaptainDataContext } from '../Context/CaptainContext.jsx'
import { SocketContext } from '../Context/SocketContext.jsx'

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride , setRide] = useState(null)
  const [userDeatilsToDriver, setUserDetailsToDriver] = useState(null)

  const ridePopUpRef = useRef(null)
  const confirmRidePopUpRef = useRef(null)

  const { driver } = useContext(CaptainDataContext)
  const { Socket } = useContext(SocketContext)

  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!driver?._id) return;
    Socket.emit('join', { userType: 'driver', userId: driver?._id })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          // console.log({userId: driver._id,
          //   location: {
          //   lat: latitude,
          //   lng: longitude,
          // }});

          Socket.emit('update-location-driver', {
            userId: driver._id,
            location: {
              lat: latitude,
              lng: longitude,
            }
          });
        });
      }
    }

    const sendLocationInterval = setInterval(updateLocation, 100000);
    updateLocation()
    // return () => clearInterval(sendLocationInterval);
  }, [])

  Socket.on('new-ride', (data) => {
    console.log("Ride Data",data);   
    setRide(data)
    setRidePopUpPanel(true)
  })

  const confirmRideByDriver = async () => {
    try {
      const response = await axios.post(`${baseURL}/ride/confirm`,
        {
          rideId:ride._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUserDetailsToDriver(response.data.data)
      console.log("Confirm ride from Driver",response.data.data);      
    } catch (error) {
      console.log("Error While Confirm Ride By Driver",error);      
    }
  }



  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpRef.current, {
        transform: 'translate(0,0)'
      })
    } else {
      gsap.to(ridePopUpRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpRef.current, {
        transform: 'translate(0,0)'
      })
    } else {
      gsap.to(confirmRidePopUpRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div>
      <div className='h-screen'>
        <div className='h-3/5 w-screen overflow-hidden'>
          <div className='fixed px-3 top-0 flex items-center justify-between w-screen'>
            <img src={Logo} alt="MoCaB" className='w-24 ' />
            <Link to='/driver/logout' className='text-2xl h-10 rounded-full px-2 mb-2 bg-white flex items-center justify-end'>
              <i className="ri-logout-box-r-line"></i>
            </Link>
          </div>
          <div className='h-full'>
            <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" className='h-full w-full object-cover' />
          </div>
        </div>
        <div className="h-2/5 px-2 bg-white shadow rounded-lg">
          <CaptainDetails />
        </div>
        <div ref={ridePopUpRef} className='bottom-0 w-full fixed translate-y-full bg-gray-50 px-3 py-8'>
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
          ride={ride}
          confirmRideByDriver={confirmRideByDriver}
          />
        </div>
        <div ref={confirmRidePopUpRef} className='bottom-0 w-full fixed translate-y-full h-full bg-gray-50 px-3 py-8'>
          <ConfirmCaptainRide setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  userDeatilsToDriver={userDeatilsToDriver} ride={ride}/>
        </div>
      </div>
    </div>
  )
}

export default CaptainHome