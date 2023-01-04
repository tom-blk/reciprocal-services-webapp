import './modal.styles.scss';

const Modal = ({children}) => {
    return(
        <div className="modal-container">
            {children}
        </div>
    )
}

export default Modal