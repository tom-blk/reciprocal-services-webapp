import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (input) => {

    const [modalIsOpen, setModalIsOpen] = useState(false); //TODO: Will be displayed in max size container
    const [errorMessages, setErrorMessages] = useState([]); //TODO: Will be displayed in max size container
    const [successMessages, setSuccessMessages] = useState([]); //TODO: Will be displayed in max size container

    const displayErrorMessage = (errorMessage) => {
        setErrorMessages(errorMessages.concat(errorMessages.length));
    }

    const displaySuccessMessage = (successMessage) => {        
        setSuccessMessages(successMessages.concat(successMessage));
    }

    useEffect(() => {
        console.log(errorMessages);
        if(errorMessages <= 0)
        return;
        setTimeout(() => {
            setErrorMessages(errorMessages.slice(0, -1));
        }, 4000)
    }, [errorMessages])

    useEffect(() => {
        console.log(successMessages);
        if(successMessages <= 0)
        return;
        setTimeout(() => {
            setSuccessMessages(successMessages.slice(0, -1));
        }, 4000)
    }, [successMessages])

    const testUser = {
        id: 1
    }

    return (
        <AppContext.Provider value={{
            testUser,
            displayErrorMessage,
            displaySuccessMessage,
            errorMessages
        }}>
            {input.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;