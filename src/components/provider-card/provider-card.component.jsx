import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../modal/modal.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";

const ProviderCard = ({ user, orderButtonExists }) => {

    const {id, firstName, lastName, profilePicture} = user;

    const navigate = useNavigate()

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const orderServiceAndCloseModal = (e) => {
        e.stopPropagation();
        setServiceOrdered(true);
        setModalIsOpen(false);
    }

    const openModal = (e) => {
        e.stopPropagation();
        if(!serviceOrdered)
        setModalIsOpen(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false);
    }

    return(
        <div onClick={e => navigate(`/providers/${id}`)} className="card">
            <RoundImageContainer picture={profilePicture} serviceOrUser={'user'} size={'card'}/>
            <div className="heading-secondary">{firstName + ' ' + lastName}</div>
            {
                orderButtonExists
                ?
                <div 
                    className={`button ${serviceOrdered ? "inactive-button" : "confirm-button"}`}
                    onClick={e => openModal(e)}
                >
                    {serviceOrdered ? "Service Ordered!" : "Order Service"}
                </div>
                :
                <Fragment/>
            }
            {
                modalIsOpen
                ?
                <Modal
                    heading="Confirm Order of Service" 
                    text="Do you really wish to order this service?" 
                    onConfirm={orderServiceAndCloseModal}
                    onClose={closeModal}
                />
                :
                <Fragment/>
            }
        </div>
    )
}

export default ProviderCard