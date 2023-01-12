import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (input) => {

    useEffect(() => {
        
    }, [])

    const testUser = {
        id: 1
    }

    return (
        <AppContext.Provider value={{
            testUser
        }}>
            {input.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;