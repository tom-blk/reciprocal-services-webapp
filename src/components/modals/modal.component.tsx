import { Fragment, useContext } from 'react';
import { ModalContext } from '../../context/modal.context';

import './modal.styles.scss';

const Modal = () => {

    //EACH COMPONENT DECIDES FOR ITSELF WHAT KIND OF MODAL TO RENDER BASED ON THE MODAL TYPE (REACT COMPONENT) THAT GETS PASSED TO THE TOGGLE MODAL FUNCTION
    const { toggleModal, modalIsOpen, modalType } = useContext(ModalContext);

    return(
        <Fragment>
            {
            modalIsOpen 
            &&
            <div className='modal-overlay' onClick={e => toggleModal()}>
                <div className="modal-container" onClick={e => {e.stopPropagation()}}>
                    {modalType}
                </div>
            </div>
            }
        </Fragment>
    )
}

export default Modal