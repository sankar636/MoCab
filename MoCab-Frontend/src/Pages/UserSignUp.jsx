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
  const [error, setError] = useState("")
  // const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
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
    if(password.length < 6){
      setError("PasswordPassword must be at least 6 characters long.")
      return;
    }

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
    
      if (response.status === 200) {
        const data = response.data.data;
        setUser(data.user); 
        console.log(data.token);        
        localStorage.setItem('token', data.token)
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
    setError("")
    setEmail("")
    setPassword("")
    setFirstname("")
    setLastname("")
    console.log("Form Sbmited Successfully");

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
              minLength={6}
              placeholder='password'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            />
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
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

/*
I set the data = response.data.data because of the structure of storing of data after submission is like
  response = {
  data: {
    data: {
      token: "...",
      user: { ... }
    },
    message: "User logedin Successfully",
    statusCode: 200,
    success: true
  },
  ...
} // so to access the data we have to write it (data.data)

// Error Validation 
-------------------
  if (password.length < 5) {
    setError('Password must be at least 5 characters long.');
    return; // Stop form submission
  }
  setError(''); // Clear error if valid

  --------------------------------
  setUser(data.user);  --> setUser comes from UserContext and this update the context. The Context can be used globally for the Program

  localStorage.setItem('token', data.token) ---> this set the token in the localstorage in client side which can be ensure the connection between client and server will not affect
  ------------------------------------
  setUser(data.user);  here i used user because in backend at the time of register i created the Useer data as user(check userrController->register>user(create))


*/