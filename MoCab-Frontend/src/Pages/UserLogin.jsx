import React, { useState } from 'react'
import Logo from '../assets/Logo1.png'
import { Link } from 'react-router-dom'
const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Sbmited Successfully");    
    //set userData
    setUserData({
      email: email,
      password: password
    })
    console.log(userData);
    
    // After the form submit email and password set to empty
    setEmail("")
    setPassword("")
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