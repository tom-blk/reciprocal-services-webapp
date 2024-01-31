import React, { createContext, useEffect, useState } from "react";
import FirstTimeVisitModal from "../components/modals/firstTimeVisit/first-time-visit-modal.component";
import { ChildrenProps } from "../types/general";

interface ModalContextType{
    toggleModal: (modalType?: React.JSX.Element) => void;
    modalIsOpen: boolean;
    modalType: React.JSX.Element | undefined;
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export const ModalContextProvider: React.FC<ChildrenProps> = ({children}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState<React.JSX.Element | undefined>(undefined);

    //EACH COMPONENT DECIDES FOR ITSELF WHAT KIND OF MODAL TO RENDER BASED ON THE MODAL TYPE (REACT COMPONENT) THAT GETS PASSED TO THE TOGGLE MODAL FUNCTION
    const toggleModal = (modalType: React.JSX.Element | undefined) => {
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
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContextProvider;