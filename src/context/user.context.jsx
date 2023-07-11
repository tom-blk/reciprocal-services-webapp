import React, { createContext, useContext, useEffect, useState } from "react";
import { AlertMessageContext } from "./alert-message.context";
import { getUser } from "../api/auth/get-user";
import { getUserSpecificServices } from "../api/users/read";

export const UserContext = createContext();

export const UserContextProvider = (input) => {

    const { displayError } = useContext(AlertMessageContext)

    const [user, setUser] = useState(undefined);
    const [userServices, setUserServices] = useState(undefined);

    useEffect(() => {
        if(user)
            console.log(user);
    }, [user])

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        getUser()
            .then(response => {
                setUser(response)
            })
            .catch(error => {
                if(error.status === 401){
                    console.log('User Is Not Authorized.')
                }else{
                    console.log(error);
                }
            }); 
    }

    const fetchUserServices = () => {
        getUserSpecificServices(user.id)
            .then(response => setUserServices(response))
            .catch(error => displayError(error))
    }

    const value = {
        user,
        fetchUser,
        setUser, // For Logout
        userServices,
        fetchUserServices
    }

    return (
        <UserContext.Provider value={value}>
            {input.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;