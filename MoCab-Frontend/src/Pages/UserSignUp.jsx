import React, { useState } from 'react'
import Logo from '../assets/Logo1.png'
import { Link } from 'react-router-dom'
const UserSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [userData, setUserData] = useState({})
  // const [fullname, setFullname] = useState("")
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Sbmited Successfully");
    //set userData
    setUserData({
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname
      }
    })
    // console.log(userData);

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