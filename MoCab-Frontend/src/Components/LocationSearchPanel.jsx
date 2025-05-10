import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {
  // console.log("Props: ", props); // suggessions, setVehiclePanelOpen, setPanelOpen, setPick, setDestination, activeField
  
  // const location = ["Location 1", "Location 2", "Location 3"] // for this location array use suggession
  const handelSuggessionClick = (suggession) => {
    if(props.activeField === 'pick' ){
      props.setPick(suggession)
    }else if(props.activeField === 'destination') {
      props.setDestination(suggession)
    }
  }
  return (
    <div>
      {Array.isArray(props.suggessions) && props.suggessions.map((element, idx) => (
        <div 
        key={idx} 
        className='flex justify-start items-center hover:bg-gray-50 p-2 rounded cursor-pointer transition duration-300'
        onClick={() => {
          // props.setVehiclePanelOpen(true)
          // props.setPanelOpen(false)
         
          handelSuggessionClick(element)
         
        }}
        >
          <h2 className='flex justify-center items-center bg-gray-400 rounded-full h-8 w-8 text-white'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='ml-2 font-semibold group-hover:text-white transition duration-300'>{element}</h4>
        </div>
      ))}
    </div>

  )
}

export default LocationSearchPanel

/*
  <div className='flex justify-start items-center hover:bg-gray-50 p-2 rounded cursor-pointer transition duration-300'>
    <h2 className='flex justify-center items-center bg-gray-400 rounded-full h-8 w-8 text-white'>
      <i className="ri-map-pin-fill"></i>
    </h2>
    <h4 className='ml-2 font-semibold group-hover:text-white transition duration-300'>Location</h4>
  </div>
  <div className='flex justify-start items-center hover:bg-gray-50 p-2 rounded cursor-pointer transition duration-300'>
    <h2 className='flex justify-center items-center bg-gray-400 rounded-full h-8 w-8 text-white'>
      <i className="ri-map-pin-fill"></i>
    </h2>
    <h4 className='ml-2 font-semibold group-hover:text-white transition duration-300'>Location 2</h4>
  </div>
  <div className='flex justify-start items-center hover:bg-gray-50 p-2 rounded cursor-pointer transition duration-300'>
    <h2 className='flex justify-center items-center bg-gray-400 rounded-full h-8 w-8 text-white'>
      <i className="ri-map-pin-fill"></i>
    </h2>
    <h4 className='ml-2  font-semibold group-hover:text-white transition duration-300'>Location 3</h4>
  </div>
*/