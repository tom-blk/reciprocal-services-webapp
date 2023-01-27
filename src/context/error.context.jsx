import React, { createContext, useEffect, useState } from "react";

export const ErrorContext = createContext();

export const ErrorContextProvider = (input) => {

    const [errorMessages, setErrorMessages] = useState([]); //TODO: Will be displayed in max size container

    //Function below and useEFfect for ErrorMessage handling need to be optimized
    const displayErrorMessage = (errorMessage) => {
        setErrorMessages(errorMessages.concat(errorMessages.length));
    }

    useEffect(() => {
        console.log(errorMessages);
        if(errorMessages.length <= 0)
        return;
        setTimeout(() => {
            setErrorMessages([]);
        }, 4000)
    }, [errorMessages])

    const value = {
        errorMessages,
        displayErrorMessage
    }

    return (
        <ErrorContext.Provider value={value}>
            {input.children}
        </ErrorContext.Provider>
    );
}

export default ErrorContextProvider;