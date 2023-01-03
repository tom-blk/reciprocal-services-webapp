import './modal.styles.scss';

const Modal = ({heading, text, onConfirm, onClose}) => {
    return(
        <div className="modal-container">
            <h2>{heading}</h2>
            <div>{text}</div>
            <div onClick={e => onConfirm(e)} className="button confirm-button">Confirm</div>
            <div onClick={e => onClose(e)} className="button cancel-button">Cancel</div>
        </div>
    )
}

export default Modal