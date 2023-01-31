import './modal.styles.scss';
import { Fragment, useContext } from 'react';
import { ModalContext } from '../../context/modal.context';
import CloseButton from '../close-button/close-button.component';

const Modal = ({children}) => {

    //EACH COMPONENT DECIDES FOR ITSELF WHAT KIND OF MODAL TO RENDER BASED ON THE MODAL TYPE (REACT COMPONENT) THAT GETS PASSED TO THE TOGGLE MODAL FUNCTION
    const { toggleModal, modalIsOpen, modalType } = useContext(ModalContext);

    return(
        <Fragment>
            {
            modalIsOpen 
            &&
            <div className='modal-overlay' onClick={e => toggleModal()}>
                <div className="modal-container">
                    <CloseButton onClickHandler={toggleModal}/>
                    {modalType}
                    <p>Test</p>
                </div>
            </div>
            }
        </Fragment>
    )
}

export default Modal