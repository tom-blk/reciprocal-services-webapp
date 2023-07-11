import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AlertMessageContext = createContext();

export const AlertMessageContextProvider = (input) => {

    const [errorMessages, setErrors] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);

    //Function below and useEFfect for ErrorMessage handling need to be optimized
    const displayError = (error) => {
        setErrors(errorMessages.concat(error.message));
        setTimeout(() => {
            setErrors([])
        }, 4000)
    }

    const displaySuccessMessage = (successMessage) => {
        setSuccessMessages(successMessages.concat(successMessage));
        setTimeout(() => {
            setSuccessMessages([])
        }, 4000)
    }

    useEffect(() => {
        console.log(errorMessages);
    }, [errorMessages])

    useEffect(() => {
        console.log(successMessages);
    }, [successMessages])

    const value = {
        errorMessages,
        successMessages,
        displayError,
        displaySuccessMessage
    }

    return (
        <AlertMessageContext.Provider value={value}>
            {input.children}
        </AlertMessageContext.Provider>
    );
}

export default AlertMessageContextProvider;