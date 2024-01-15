import React, { createContext, useEffect, useState } from "react";
import FirstTimeVisitModal from "../components/modals/firstTimeVisit/first-time-visit-modal.component";

export const ModalContext = createContext();

export const ModalContextProvider = (input) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState();

    //EACH COMPONENT DECIDES FOR ITSELF WHAT KIND OF MODAL TO RENDER BASED ON THE MODAL TYPE (REACT COMPONENT) THAT GETS PASSED TO THE TOGGLE MODAL FUNCTION
    const toggleModal = (modalType) => {
        setModalType(modalType);
        setModalIsOpen(!modalIsOpen);
    }

    useEffect(() => {
        if(!localStorage.getItem('prometheusFirstTimeVisitToken'))
        toggleModal(<FirstTimeVisitModal/>);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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