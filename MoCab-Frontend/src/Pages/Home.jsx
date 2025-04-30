import React from 'react'
import Logo from '../assets/Logo1.png'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <div className='h-screen w-full flex items-start justify-between flex-col pt-2 bg-[url(https://img.freepik.com/premium-photo/traffic-lights-street-illustration-images_926199-4266601.jpg?w=360)] bg-bg-cover'>
        <img src={Logo} alt="" className='w-[100px]'/>
        <div className='py-4 px-4 bg-red-400 w-full'>
          <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
          <Link to='/UserLogin' className='flex items-center justify-center text-xl w-full bg-black text-white py-3 rounded mt-2 pb-5'>continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home

// (1.) instead of continue(button) use Link tag which is a block element we need to add inline-block in the css part 