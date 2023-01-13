import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (input) => {

    const [errorMessage, setErrorMessage] = useState(undefined); //TODO: Will be displayed in max size container

    const displayErrorMessage = (errorMessage) => {
        setErrorMessage(errorMessage);
        setTimeout(() => {
            setErrorMessage(undefined);
        }, 4000)
    }

    useEffect(() => {
        
    }, [])

    const testUser = {
        id: 1
    }

    return (
        <AppContext.Provider value={{
            testUser,
            displayErrorMessage
        }}>
            {input.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;