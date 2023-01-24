import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (input) => {

    const [modalIsOpen, setModalIsOpen] = useState(false); //TODO: Will be displayed in max size container
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

    const testUser = {
        id: 1
    }

    return (
        <AppContext.Provider value={{
            testUser,
            displayErrorMessage,
            errorMessages
        }}>
            {input.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;