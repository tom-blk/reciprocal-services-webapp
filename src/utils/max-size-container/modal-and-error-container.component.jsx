import { Fragment, useContext } from "react";
import { AppContext } from "../../context/app-context";
import Modal from '../modal/modal.component';

import './modal-and-error-container.styles.scss';

const ModalAndErrorContainer = () => {

    const appContext = useContext(AppContext)

    return(
        <div className="modal-and-error-container">
            {
                appContext.modalIsOpen
                ?
                <Modal heading={"Test"} text={"Test text"}/>
                :
                <Fragment/>
            }
            {
                appContext.errorMessages
                ?
                <div>
                {
                    appContext.errorMessages.map(() => {
                        return(
                            <div className="error-message">{appContext.errorMessages.length}</div>
                        )
                    })
                }
                </div> 
                :
                <Fragment/>
            }
        </div>
    )
}

export default ModalAndErrorContainer