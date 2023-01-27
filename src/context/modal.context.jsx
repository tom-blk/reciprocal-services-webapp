import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (input) => {

    const [modalIsOpen, setModalIsOpen] = useState(false); //TODO: Will be displayed in max size container

    const value = {
        modalIsOpen,
        setModalIsOpen
    }

    return (
        <ModalContext.Provider value={value}>
            {input.children}
        </ModalContext.Provider>
    );
}

export default ModalContextProvider;