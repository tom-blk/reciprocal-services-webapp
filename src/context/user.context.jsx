import React, { createContext, useContext, useEffect, useState } from "react";
import { AlertMessageContext } from "./alert-message.context";
import { getUser } from "../api/auth/get-user";
import { fireEvent } from "@testing-library/react";

export const UserContext = createContext();

export const UserContextProvider = (input) => {

    const { displayError } = useContext(AlertMessageContext)

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if(!user){
            console.log('User not authenticated');
        }else if(user){
            console.log('User: ' + user.userName);
        }
    }, [user])

    useEffect(() => {
        getUser(document.cookie.split('=')[1], displayError)
            .then(response => setUser(response)); 
    }, [])

    const value = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={value}>
            {input.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;