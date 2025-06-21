import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assets/Logo1.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext.jsx'

const CaptainSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [vehicleColor, setVehicleColor] = useState("")
  const [vehiclePlate, setVehiclePlate] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [vehicleCapacity, setVehicleCapacity] = useState("")
  // const [driverData, setDriverData] = useState({})
  
  const { driver, setDriver } = useContext(CaptainDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form Sbmited Successfully");
    /*
    //set userData
    setDriverData({
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      // there is no need for state like fullname, vehicle
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        vehicletype: vehicleType,
        capacity: vehicleCapacity
      }
    })
    // console.log(driverData);
    */
    const newDriverData = {
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      // there is no need for state like fullname, vehicle
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }
    }
    console.log("Vehicle Type: ",vehicleType);
    
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      // console.log("Error Before Registratation");      
      const response = await axios.post(`${baseURL}/driver/register`,newDriverData)
      console.log("Driver Registratation: ",response);     
      if(response.status === 200){
        const data = response.data.data;
        console.log("DATA",data);
        setDriver(data.newDriver)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      } 
    } catch (error) {
      console.log("Error While Registering the Driver", error);
      
    } 


    // After the form submit email and password set to empty
    setEmail("")
    setPassword("")
    setFirstname("")
    setLastname("")
    setVehicleCapacity("")
    setVehicleColor("")
    setVehiclePlate("")
    setVehicleType("")
  }
  return (
    <div className='flex h-screen flex-col justify-between'>
      <div >
        <img src={Logo} alt="" className='w-20' />
        <form className='px-7' onSubmit={(e) => { submitHandler(e) }}>
          <div className='mb-2'>
            <h3 className='text-xl mb-2 font-medium'>What is Your Name</h3>
            <div className='flex flex-row gap-1'>
              <input
                required
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value)
                }}
                placeholder='ex- sankar'
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              />
              <input
                // required
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value)
                }}
                placeholder='ex- sahu'
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              />
            </div>
          </div>
          <div>
            <h3 className='text-xl mb-2 font-medium'>What's Your Email</h3>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder='email@example.com'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            />
            <h3 className='text-xl mb-2 font-medium'>Enter Password</h3>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder='password'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            />
          </div>
          <div className=''>
            <h3 className='text-xl mb-2 font-medium'>Vehicl Details</h3>
            <div className=' rounded grid grid-cols-2 gap-2'>
              <input
                required
                type="text"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value)
                }}
                placeholder='Vehicle Color'
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              />
              <input
                required
                type="text"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value)
                }}
                placeholder='Plate Number'
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              /><input
                required
                type="number"
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
                placeholder='Capacity'
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              />
              <select className='bg-[#eeeeee]'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value='car'>Car</option>
                <option value='bike'>Bike</option>
                <option value='auto'>Auto</option>
              </select>
            </div>
          </div>
          <button className='bg-[#111111] text-white mb-2 mt-4 rounded px-4 py-2  border w-full font-semibold placeholder:text-base '>Register As Driver</button>
        </form>
        <p className='ml-8'>Already Have Account <Link to='/CaptainLogin' className='text-blue-600'>Click Here</Link></p>
      </div>
      <div className='px-7'>

        <p className='text-[10px] leading-tight mb-5'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>

      </div>
    </div>
  )
}

export default CaptainSignUp


// setDriver(data.newDriver)  ---> here i used newDriver because in backend at the time of register i created the driver data as newDriver(check driverController->register>newDriver(create))
