import React from 'react'
import DriverProfile from '../assets/DriverProfile.jpg'

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-3 py-4 border-b-2">
        <div>
          <img src={DriverProfile} alt="Driver" className="w-16 h-16 rounded-full object-cover" />
        </div>
        <h1 className="text-lg font-semibold">SankarShan</h1>
        <div className="text-right">
          <h4 className="text-xl font-bold text-green-600">&#8377;195.5</h4>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>
      <div className="flex justify-around py-4 bg-yellow-200 mt-6">
        <div className="flex flex-col items-center">
          <i className="ri-pin-distance-line text-2xl text-blue-500 mb-1"></i>
          <h5 className="text-lg font-semibold">10.5</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="ri-speed-up-line text-2xl text-yellow-500 mb-1"></i>
          <h5 className="text-lg font-semibold">40</h5>
          <p className="text-sm text-gray-500">Rides</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="ri-speed-up-line text-2xl text-red-500 mb-1"></i>
          <h5 className="text-lg font-semibold">14</h5>
          <p className="text-sm text-gray-500">Cancellations</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails