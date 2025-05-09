import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log("Get Token From the LocalStorage",token)
    const baseURL = import.meta.env.VITE_BASE_URL;
    console.log("BaseUrl",baseURL);
    
    // console.log("User Logout Token",token);

    useEffect(() => {
        const logoutUser = async () => {
            if (!token) {
                console.error("No token found. Redirecting to login.");
                navigate('/UserLogin');
                return;
            }
            try {
                console.log("Hello UserLogout");
                const response = await axios.post(`${baseURL}/user/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    // withCredentials: true
                });
                console.log("UserLogout ", response);

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/UserLogin');
                }
                console.log("logoutUser successfully");                
            } catch (err) {
                // console.error('Error While Logout The User', err);
                console.error('Error While Logout The User', err);
            }
            // finally {
            //     console.log("Finally Executed");                
            //     localStorage.removeItem('token');
            //     navigate('/UserLogin');
            // }
        };

        logoutUser();
    }, [navigate, token, baseURL]);

    return (
    <div>UserLogout</div>
    )
};

export default UserLogout;

// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const LogoutButton = () => {
//   const navigate = useNavigate()
//   const baseURL = import.meta.env.VITE_BASE_URL

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('token')
//       await axios.post(`${baseURL}/user/logout`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       })
//     } catch (error) {
//       console.error('Logout error:', error)
//     } finally {
//       localStorage.removeItem('token')
//       navigate('/userlogin') // go to login page
//     }
//   }

//   return (
//     <button onClick={handleLogout} className='text-2xl h-10 rounded-full px-2 mb-2 bg-white flex items-center justify-end'>
//       <i className="ri-logout-box-r-line"></i>
//     </button>
//   )
// }

// export default LogoutButton
