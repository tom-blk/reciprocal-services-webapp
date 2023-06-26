import React, { createContext, useContext, useEffect, useState } from "react";
import { AlertMessageContext } from "./alert-message.context";
import { getUser } from "../api/auth/get-user";

export const UserContext = createContext();

export const UserContextProvider = (input) => {

    const { displayError } = useContext(AlertMessageContext)

    const [user, setUser] = useState(undefined);

    const setAuthToken = (jwt) => {
        document.cookie = `prometheusUserAuthenticationToken=${jwt}`;
    }

    useEffect(() => {
        if(!user){
            console.log('User not authenticated');
        }else if(user){
            console.log('User: ' + user.userName + ', id: ' + user.id);
        }
    }, [user])

    useEffect(() => {
        getUser(document.cookie, displayError)
            .then(response => {
                setUser(response)
            })
            .catch(error => {
                displayError(error);
            }); 
    }, [])

    const value = {
        user,
        setUser,
        setAuthToken
    }

    return (
        <UserContext.Provider value={value}>
            {input.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;