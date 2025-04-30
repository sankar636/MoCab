import React, { useContext, useState } from 'react'
import Logo from '../assets/Logo1.png'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { UserDataContext } from '../Context/UserContext.jsx'

const UserSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  // const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form Sbmited Successfully");
    /*
    set userData(for Frontend)
    setUserData({
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname
      }
    })
    */

    // For Backend Setting of userData
    const newUserData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,

    } // Now we need to send the data to backend by using asios (make the function async)

    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseURL}/user/register`, newUserData);
      console.log("Registered:", response);
    
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user); // assuming this is defined
        navigate('/home');
      }
    } catch (err) {
      console.error("Error while registering user:", err);
    }

    // Check if the response was successful
    // if (response.status === 201) {
    //   const data = response.data;
    //   setUser(data.user); // Make sure setUser is defined in context
    //   navigate('/home');
    // }


    // After the form submit email and password set to empty
    setEmail("")
    setPassword("")
    setFirstname("")
    setLastname("")
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
          <button className='bg-[#111111] text-white mb-2 mt-4 rounded px-4 py-2  border w-full font-semibold placeholder:text-base '>Register</button>
        </form>
        <p className='ml-8'>Already Have Account <Link to='/UserLogin' className='text-blue-600'>Click Here</Link></p>
      </div>
      <div className='px-7'>

        <p className='text-[10px] leading-tight mb-5'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>

      </div>
    </div>
  )
}

export default UserSignUp


// Like asios other methods to send data from frontend to backend are (fetch Api, GraphSOL, WebSocket, form etc XmlHTTPRequest)