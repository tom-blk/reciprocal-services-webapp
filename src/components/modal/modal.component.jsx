const Modal = ({heading, text, onConfirm, onClose}) => {
    return(
        <div className="modal-container">
            <h2>{heading}</h2>
            <div>{text}</div>
            <div className="confirm-button">{onConfirm()}</div>
            <div className="cancel-button">{onClose()}</div>
        </div>
    )
}

export default Modal