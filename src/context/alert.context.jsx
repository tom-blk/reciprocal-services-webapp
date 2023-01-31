import React, { createContext, useEffect, useState } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = (input) => {

    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);

    //Function below and useEFfect for ErrorMessage handling need to be optimized
    const displayErrorMessage = (errorMessage) => {
        setErrorMessages(errorMessages.concat(`Error ${errorMessages.length + 1}`));
        setTimeout(() => {
            setErrorMessages([])
        }, 4000)
    }

    const displaySuccessMessage = (successMessage) => {
        setSuccessMessages(successMessages.concat(successMessage));
        /* setTimeout(() => {
            setSuccessMessages([])
        }, 4000) */
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
        displayErrorMessage,
        displaySuccessMessage
    }

    return (
        <AlertContext.Provider value={value}>
            {input.children}
        </AlertContext.Provider>
    );
}

export default AlertContextProvider;