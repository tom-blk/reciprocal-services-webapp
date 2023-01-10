import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../modal/modal.component";
import RoundImageContainer from "../profile-avatar/round-image-container.component";

const ProviderCard = ({ provider, orderButtonExists }) => {

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
        <div onClick={e => navigate(`/providers/${provider.id}`)} className="card">
            <RoundImageContainer picture={provider.profile_picture} size={'card'}/>
            <div className="heading-secondary">{provider.first_name + ' ' + provider.last_name}</div>
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