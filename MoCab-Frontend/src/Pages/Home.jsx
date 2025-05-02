import React, { useRef, useState } from 'react'
import Logo from '../assets/Logo1.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel.jsx'

const Home = () => {
  const [pick, setPick] = useState("")
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehicleRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })
      gsap.to(panelCloseRef.current , {
        opacity: '1'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      }) 
      gsap.to(panelCloseRef.current , {
        opacity: '0'
      })
    }
  }, [panelOpen])

  useGSAP(function() {
    if(vehiclePanelOpen){
      gsap.to(vehicleRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehicleRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanelOpen])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img src={Logo} alt="MoCaB" className='w-24 absolute left-1 top-1' />
      <div className='h-screen w-screen'>
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" className='h-full w-full object-cover' />
      </div>
      <div className="absolute top-0 left-0 h-screen w-full flex flex-col justify-end">
        <div
          className='h-[30%] py-5 px-5 bg-white relative'
        >
          <p 
          className=' absolute opacity-0 top-1/6 right-6 text-3xl font-semibold'
          onClick={() => {
            setPanelOpen(false)
          }}
          ref={panelCloseRef}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </p>
          <h3 className="font-semibold text-2xl text-gray-800">Find a trip</h3>
          <form
            className="mt-3"
            onSubmit={(e) => {
              submitHandler(e)
            }}
            onClick={() => {
              setPanelOpen(true)
            }}
          >
            <div className='w-1 h-[60px] bg-black left-9 top-1/2 absolute'></div>
            <input
              type="text"
              value={pick}
              onChange={(e) => {
                setPick(e.target.value)
              }}
              className="bg-[#eee] mt-2 px-6 py-3 text-base w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition"
              placeholder="Enter Your Pick Up Location"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className="bg-[#eeeeee] mt-2 px-6 py-3 text-base w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition"
              placeholder="Enter Your Destination"
            />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
              <LocationSearchPanel  setVehiclePanelOpen={setVehiclePanelOpen} setPanelOpen={setPanelOpen}/>
        </div>
      </div>
      <div ref={vehicleRef} className='bottom-0 w-full fixed translate-y-full bg-gray-50 px-3 py-8'>
        <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen}setPanelOpen={setPanelOpen} />
      </div>
    </div>
  )
}

export default Home


/*
GSAP is an animation library which provides hook
NOTE--> position static is prevent bottom-0 to show the div so used fixed
*/