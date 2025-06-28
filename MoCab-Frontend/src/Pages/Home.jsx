import React, { useEffect, useRef, useState } from 'react'
import { data, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import Logo from '../assets/Logo1.png'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel.jsx'
import ConfirmRide from '../Components/ConfirmRide.jsx'
import LookingDriver from '../Components/LookingDriver.jsx'
import WaitingDriver from '../Components/WaitingDriver.jsx'
import axios from 'axios'

import { UserDataContext } from '../Context/UserContext.jsx'
import { SocketContext } from '../Context/SocketContext.jsx'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// import LogoutButton from '../Components/LogoutButton.jsx'

const Home = () => {
  const [pick, setPick] = useState("")
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const [pickUpSuggession, setPickUpSuggession] = useState([])
  const [destinationSuggession, setDestinationSuggession] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [vehicleType, setVehicleType] = useState(null)
  const [fare, setFare] = useState({})
  const [rideConfirmByDriver, setRideConfirmByDriver] = useState(null)


  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehicleRef = useRef(null)
  const confirmRideRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const driverFoundRef = useRef(null)

  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate()

  const { user } = useContext(UserDataContext)
  const { Socket } = useContext(SocketContext)
  // console.log(user);

  useEffect(() => {
if (Socket) {
    Socket.emit('join', { userType: 'user', userId: user?._id });
    }
  }, [Socket, user]);

  const handelPickUpChange = async (e) => {
    setPick(e.target.value)
    try {
      const response = await axios.get(`${baseURL}/map/getsuggession`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // console.log("Pick Up Data",response.data.data);

      setPickUpSuggession(response.data.data)

    } catch (error) {
      console.log("NO Pickup Location", error);

    }
  }

  const handelDestinationChange = async (e) => {
    setDestination(e.target.value)

    const baseURL = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.get(`${baseURL}/map/getsuggession`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // console.log("setDestinationSuggession Data",response.data.data);

      setDestinationSuggession(response.data.data)

    } catch (error) {
      console.log("NO Pickup Location", error);

    }
  }

  const findTrip = async () => {
    setVehiclePanelOpen(true)
    setPanelOpen(false)

    const response = await axios.get(`${baseURL}/ride/getfare`,
      {
        params: { pickup: pick, destination: destination },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    // console.log(response.data.data.fare); 
    const fareFromData = response.data.data.fare
    setFare(fareFromData)
  }

  const initiateRide = async () => {
    // const token = localStorage.getItem('token');
    try {
    const response = await axios.post(
      `${baseURL}/ride/create`,
      {
        pickup: pick,
        destination: destination,
        vehicleType: vehicleType
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Initiate Ride", response.data);
    // const rideData = response.data.data
    // setRide(rideData)
    } catch (error) {
      console.log("Error in Initiating Ride", error);
    }
  };

  // After confirmation of ride by driver the socket send message. Now here we have to get it 
  Socket.on('confirm-ride', (data) => {
    // console.log("Ride Data",data);   
    // console.log(data);
    setRideConfirmByDriver(data)
    setWaitingForDriver(true)    
  })

  // After Driver Enter tht OTP given by the user then this message will come   
  Socket.on('started-ride', (data) => {
    // console.log("Ride Data",data);   
    console.log("started ride data",data);
    setWaitingForDriver(false)
    navigate('/Ride', {state: {data}}) 
    //// Pass `data` safely // This pass ride data in state which is accessed in CaptainRide component
  })



  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '60%',
        padding: "20px",
      })
      gsap.to(panelCloseRef.current, {
        opacity: '1'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
      })
      gsap.to(panelCloseRef.current, {
        opacity: '0'
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehicleRef.current, {
        transform: 'translate(0,0)',
        zIndex: 15, // Ensure VehiclePanel is above others
      });
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)',
        zIndex: 10, // Reset ConfirmRide z-index when VehiclePanel is open
      });
    } else {
      gsap.to(vehicleRef.current, {
        transform: 'translateY(100%)',
        zIndex: 10, // Reset z-index when closed
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(function () {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRideRef.current, {
        transform: 'translate(0,0)',
        zIndex: 20, // Ensure ConfirmRide panel is on top
      });
      gsap.to(vehicleRef.current, {
        transform: 'translateY(100%)',
        zIndex: 10, // Reset VehiclePanel z-index when ConfirmRide is open
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)',
        zIndex: 10, // Reset z-index when closed
      });
    }
  }, [confirmRidePanelOpen]);

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translate(0,0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(driverFoundRef.current, {
        transform: 'translate(0,0)',
        zIndex: 20, // Ensure LookingDriver panel is on top
      });
    } else {
      gsap.to(driverFoundRef.current, {
        transform: 'translateY(100%)',
        zIndex: 10, // Reset z-index when closed
      });
    }
  }, [waitingForDriver])


  return (
    <div className="relative h-screen overflow-hidden"
      style={{ backgroundImage: "url('https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif')" }}
    >

      {/* ✅ HEADER moved to top with high z-index */}
      <div className="fixed top-0 left-0 w-full px-3 flex items-center justify-between h-[60px] z-[9999]"

      >
        <img src={Logo} alt="MoCaB" className="w-24" />
        <Link
          to="/user/logout"
          className="text-2xl h-10 rounded-full px-2 bg-white flex items-center justify-end cursor-pointer"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* ✅ PUSH MAIN CONTENT DOWN BY HEADER HEIGHT */}
      <div className="pt-[60px]">
        <div className="h-screen w-screen">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Background overlay panel */}
        <div className="absolute top-0 left-0 h-screen w-full flex flex-col justify-end z-12 ">
          <div className="h-[35%] py-5 px-5 bg-white relative">
            <p
              className="absolute opacity-0 top-1/6 right-6 text-3xl font-semibold"
              onClick={() => setPanelOpen(false)}
              ref={panelCloseRef}
            >
              <i className="ri-arrow-down-wide-line"></i>
            </p>
            <h3 className="font-semibold text-2xl text-gray-800">Find a trip</h3>
            <form
              className="mt-3"
              onSubmit={(e) => { submitHandler(e) }}

            >
              <div className="w-1 h-[60px] bg-black left-9 top-[40%] absolute"></div>
              <input
                type="text"
                value={pick}
                onChange={handelPickUpChange}

                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('pick')
                }}
                className="bg-[#eee] mt-2 px-6 py-3 text-base w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition"
                placeholder="Enter Your Pick Up Location"
              />
              <input
                type="text"
                value={destination}
                // onChange={(e) => setDestination(e.target.value)} // for frontend
                onChange={handelDestinationChange} // for backend

                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('destination')
                }}
                className="bg-[#eeeeee] mt-2 px-6 py-3 text-base w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition"
                placeholder="Enter Your Destination"
              />
            </form>
            <button className='w-full text-white text-2xl bg-blue-600 mt-4 py-4 rounded'
              onClick={() => findTrip()}
            >Find A Trip</button>
          </div>
          <div ref={panelRef} className="h-0 bg-white z-10">
            <LocationSearchPanel
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPanelOpen={setPanelOpen}
              suggessions={activeField === 'pick' ? pickUpSuggession : destinationSuggession}
              setPick={setPick}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        {/* Bottom panels */}
        <div
          ref={vehicleRef}
          className="bottom-0 w-full fixed translate-y-full bg-gray-50 px-3"
        >
          <VehiclePanel
            setPanelOpen={setPanelOpen}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setVehicleType={setVehicleType}
            fare={fare}
          />
        </div>
        <div
          ref={confirmRideRef}
          className="bottom-0 w-full fixed translate-y-full bg-gray-50 px-3"
        >
          <ConfirmRide
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehicleFound={setVehicleFound}

            initiateRide={initiateRide}

            vehicleType={vehicleType}
            fare={fare}
            pick={pick}
            destination={destination}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className="bottom-0 w-full fixed translate-y-full bg-gray-50 px-3"
        >
          <LookingDriver
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}

            initiateRide={initiateRide}
            // ride={ride}

            vehicleType={vehicleType}
            fare={fare}
            pick={pick}
            destination={destination}
          />
        </div>
        <div
          ref={driverFoundRef}
          className="bottom-0 w-full fixed translate-y-full bg-gray-50 px-3 py-8 z-10"
        >
          <WaitingDriver
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            fare={fare}
            rideConfirmByDriver={rideConfirmByDriver}
          />
        </div>
      </div>
    </div>

  )
}

export default Home


/*
GSAP is an animation library which provides hook
NOTE--> position static is prevent bottom-0 to show the div so used fixed
*/