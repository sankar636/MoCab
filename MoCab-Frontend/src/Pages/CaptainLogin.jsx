import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/DriverLogo.png'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'
const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [driverData, setDriverData] = useState({})

  const navigate = useNavigate()
  const { driver, setDriver} = useContext(CaptainDataContext)

  const submitHandler = async(e) => {
    e.preventDefault();
    //set userData
    // setDriverData({
    //   email: email,
    //   password: password
    // })
    // console.log(driverData);
    const driverData = {
      email: email,
      password: password
    }
    const baseURL= import.meta.env.VITE_BASE_URL
    try {
      const response = await axios.post(`${baseURL}/driver/login`,driverData)
      console.log("Login Driver",response);

      if(response.status === 200){
        const data = response.data.data;
        console.log("Driver Data",data);
        setDriver(data.driver)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }
      // setDriver(response)
    } catch (error) {
      console.log("Error While Login Captain");
      
    }
    
    // After the form submit email and password set to empty
    setEmail("")
    setPassword("")
    console.log("Form Sbmited Successfully");    

  }
  return (
    <div className='flex h-screen flex-col justify-between'>
      <div >
        <img src={Logo} alt="" className='w-20' />
        <form className='px-7' onSubmit={(e) => {submitHandler(e)}}>
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
          <button className='bg-[#111111] text-white mb-2 mt-4 rounded px-4 py-2  border w-full font-semibold placeholder:text-base '>Login</button>
          <p>Join A fleet <Link to='/CaptainSignUp' className='text-blue-600'>Register As a Driver</Link></p>
        </form>
      </div>
      <div className='px-7'>
        <Link to='/UserLogin' className='bg-[#ff0000] text-white mb-7 mt-4 rounded px-4 py-2  border w-full font-semibold placeholder:text-base flex justify-center items-center'>SignIn as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin