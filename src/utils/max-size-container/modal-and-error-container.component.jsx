import { useContext } from "react";
import { ModalContext } from "../../context/modal.context";
import Modal from '../modal/modal.component';

import './modal-and-error-container.styles.scss';

const ModalAndErrorContainer = () => {

    const modalContext = useContext(ModalContext)

    return(
        <div className="modal-and-error-container">
            { modalContext.modalIsOpen && <Modal heading={"Test"} text={"Test text"}/> }
        </div>
    )
}

export default ModalAndErrorContainer