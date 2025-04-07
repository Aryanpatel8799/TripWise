import React from 'react'
import { useState,createContext } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {

    const [user,setUser] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
    });
  return (
    <UserDataContext.Provider value={{user,setUser}}>
        {children}
    </UserDataContext.Provider>
  )
}

export default UserContext