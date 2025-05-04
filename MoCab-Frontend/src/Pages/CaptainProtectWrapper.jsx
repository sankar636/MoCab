import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'



const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)


  const { driver, setDriver} = useContext(CaptainDataContext)
  useEffect(() => {
    if(!token){
      navigate('/CaptainLogin')
    }
    const baseURL = import.meta.env.VITE_BASE_URL
    axios.get(`${baseURL}/driver/profile`,{
      headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
      // console.log("Captain Protected Wrapper",response)
      if(response.status === 200){
        setDriver(response.data)
        setIsLoading(false)
      }
  }).catch(err => {
    console.log("Error in CaptainProtectWrapper",err);
    localStorage.removeItem('token')
    navigate('/CaptainLogin')
  })
  },[token])

  if(isLoading){
    return(
      <div>
        Loading....
      </div>
    )
  }
  
  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectWrapper