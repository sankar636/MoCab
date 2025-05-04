import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogoutButton = () => {
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_BASE_URL

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${baseURL}/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      navigate('/UserLogin') // go to login page
    }
  }

  return (
    <button onClick={handleLogout} className='text-2xl h-10 rounded-full px-2 mb-2 bg-white flex items-center justify-end'>
      <i className="ri-logout-box-r-line"></i>
    </button>
  )
}

export default LogoutButton
