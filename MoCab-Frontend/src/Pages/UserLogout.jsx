import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const baseURL = import.meta.env.VITE_BASE_URL;
    // console.log("User Logout Token",token);

    useEffect(() => {
        const logoutUser = async () => {

            try {
                console.log("Hello UserLogout");
                const response = await axios.post(`${baseURL}/user/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("UserLogout ", response);

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/UserLogin');
                }
                console.log("logoutUser successfully");                
            } catch (err) {
                // console.error('Error While Logout The User', err);
                console.error('Error While Logout The User', err.response);
            }
        };

        logoutUser();
    }, [navigate, token, baseURL]);

    return <div>UserLogout</div>;
};

export default UserLogout;
