import React, { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (input) => {

    const testUser = {
        id: 2
    }

    const value = {
        testUser
    }

    return (
        <UserContext.Provider value={value}>
            {input.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;