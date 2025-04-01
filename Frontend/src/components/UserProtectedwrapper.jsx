import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'
const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
        localStorage.clear();
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser]);

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper;