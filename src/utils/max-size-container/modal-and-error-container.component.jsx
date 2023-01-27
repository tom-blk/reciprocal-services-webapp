import { Fragment, useContext } from "react";
import { ErrorContext } from "../../context/error.context";
import { ModalContext } from "../../context/modal.context";
import Modal from '../modal/modal.component';

import './modal-and-error-container.styles.scss';

const ModalAndErrorContainer = () => {

    const errorContext = useContext(ErrorContext)
    const modalContext = useContext(ModalContext)

    return(
        <div className="modal-and-error-container">
            { modalContext.modalIsOpen && <Modal heading={"Test"} text={"Test text"}/> }
            {
                errorContext.errorMessages &&
                <div>
                {
                    errorContext.errorMessages.map(() => {
                        return(
                            <div className="error-message">{errorContext.errorMessages.length}</div>
                        )
                    })
                }
                </div> 
            }
        </div>
    )
}

export default ModalAndErrorContainer