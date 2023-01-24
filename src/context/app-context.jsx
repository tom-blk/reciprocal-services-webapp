import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (input) => {

    const [modalIsOpen, setModalIsOpen] = useState(false); //TODO: Will be displayed in max size container
    const [errorMessages, setErrorMessages] = useState([]); //TODO: Will be displayed in max size container
    const [successMessages, setSuccessMessages] = useState([]); //TODO: Will be displayed in max size container

    const displayErrorMessage = (errorMessage) => {
        console.log(errorMessages);
        var array = errorMessages
        array.unshift(errorMessage)
        setErrorMessages(array);
        setTimeout(() => {
            var array = errorMessages;
            array.pop();
            setErrorMessages(array);
        }, 4000)
    }

    const displaySuccessMessage = (successMessage) => {
        console.log(successMessages);
        var array = successMessages
        array.unshift(successMessage)
        setSuccessMessages(array);
        setTimeout(() => {
            var array = successMessages;
            array.pop();
            setSuccessMessages(array);
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
            displayErrorMessage,
            displaySuccessMessage,
            errorMessages
        }}>
            {input.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;