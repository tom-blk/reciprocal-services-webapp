import { useContext } from "react";
import { AlertContext } from "../../context/alert.context";
import { ModalContext } from "../../context/modal.context";
import Modal from '../modal/modal.component';

import './modal-and-error-container.styles.scss';

const ModalAndErrorContainer = () => {

    const alertContext = useContext(AlertContext)
    const modalContext = useContext(ModalContext)

    return(
        <div className="modal-and-error-container">
            { modalContext.modalIsOpen && <Modal heading={"Test"} text={"Test text"}/> }
            {
                alertContext.errorMessages &&
                <div>
                {
                    alertContext.errorMessages.map(() => {
                        return(
                            <div className="error-message">{alertContext.errorMessages.length}</div>
                        )
                    })
                }
                </div> 
            }
        </div>
    )
}

export default ModalAndErrorContainer