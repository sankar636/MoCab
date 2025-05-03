import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const baseURL = import.meta.env.VITE_BASE_URL
  useEffect(() => {
    const logoutDriver = async () => {
      try {
        const response = await axios.post(`${baseURL}/driver/logout`,{}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/CaptainLogin');
        }
      } catch (err) {
        console.error('Error while logging out the driver:', err);
      }
    };

    logoutDriver();
  }, [navigate, token, baseURL]);

  return (
    <div>
      DriverLogout
    </div>
  )
}

export default CaptainLogout