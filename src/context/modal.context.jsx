import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (input) => {

    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [modalType, setModalType] = useState();

    //EACH COMPONENT DECIDES FOR ITSELF WHAT KIND OF MODAL TO RENDER BASED ON THE MODAL TYPE (REACT COMPONENT) THAT GETS PASSED TO THE TOGGLE MODAL FUNCTION
    const toggleModal = (modalType) => {
        setModalType(modalType);
        setModalIsOpen(!modalIsOpen);
    }

    const value = {
        toggleModal,
        modalIsOpen,
        modalType
    }

    return (
        <ModalContext.Provider value={value}>
            {input.children}
        </ModalContext.Provider>
    );
}

export default ModalContextProvider;