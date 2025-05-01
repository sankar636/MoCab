import React, { useState } from 'react'
import Logo from '../assets/Logo1.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext.jsx'
import { useContext } from 'react'

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)
  

  const submitHandler = async (e) => {
    e.preventDefault();
    // //set userData
    // setUserData({
    //   email: email,
    //   password: password
    // })
    // console.log(userData);

    const userData = {
      email,
      password
    }
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseURL}/user/login`, userData);
      console.log("Login User:", response);

      if (response.status === 200) {
        const data = response.data.data; // this is because of the structure of the code
        // console.log("Data ",data);
        // console.log("User Data",data.user);        
        // console.log("Token", data.token);        
        setUser(data.user); 
        localStorage.setItem('token', data.token)
        navigate('/home');
      }
    } catch (err) {
      console.error("Error while Login user:", err);
      console.log("Login Error:", err.message);
      
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
        <form className='px-7' onSubmit={(e) => { submitHandler(e) }}>
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
            minLength={6}
            placeholder='password'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          />
          <button className='bg-[#111111] text-white mb-2 mt-4 rounded px-4 py-2  border w-full font-semibold placeholder:text-base '>Login</button>
          <p>New Here?<Link to='/UserSignUp' className='text-blue-600'>Create New Account</Link></p>
        </form>
      </div>
      <div className='px-7'>
        <Link to='/CaptainLogin' className='bg-[#1ad154] text-white mb-7 mt-4 rounded px-4 py-2  border w-full font-semibold placeholder:text-base flex justify-center items-center'>SignIn as Driver</Link>
      </div>
    </div>
  )
}

export default UserLogin