import React, { createContext, useContext, useEffect, useState } from "react";
import { AlertMessageContext } from "./alert-message.context";
import { getUser } from "../api/auth/get-user";
import { getUserSpecificServices } from "../api/users/read";

export const UserContext = createContext();

export const UserContextProvider = (input) => {

    const { displayError } = useContext(AlertMessageContext)

    const [user, setUser] = useState(undefined);
    const [userServices, setUserServices] = useState(undefined);

    const setAuthToken = (jwt) => {
        document.cookie = `prometheusUserAuthenticationToken=${jwt}`;
    }

    useEffect(() => {
        if(!user){
            console.log('User not authenticated');
        }else if(user){
            console.log(user);
        }
    }, [user])

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        getUser(document.cookie, displayError)
            .then(response => {
                setUser(response)
            })
            .catch(error => {
                displayError(error);
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
        fetchUserServices,
        setAuthToken
    }

    return (
        <UserContext.Provider value={value}>
            {input.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;