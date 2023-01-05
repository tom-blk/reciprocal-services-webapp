import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import Modal from '../modal/modal.component'
import RoundImageContainer from "../profile-avatar/round-image-container.component";
import "./service-card.styles.scss";

const ServiceCard = ({service, orderButtonExists}) => {

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState()

    const navigate = useNavigate();

    const orderServiceAndCloseModal = (e) => {
        e.stopPropagation();
        setServiceOrdered(true);
        setModalIsOpen(false);
    }

    const openModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false);
    }

    return(
        <div onClick={e => navigate(`/services/${service.id}`)} className="card service-card">
            <RoundImageContainer picture={service.icon} size={"card"}/>
            <div className="card-data-container">
                <div className="heading-secondary">{service.title}</div>
                <div className="text">{service.description}</div>
            </div>
            {
                orderButtonExists
                ?
                <div 
                    className={`button ${serviceOrdered ? "inactive-button" : "confirm-button"}`}
                    onClick={e => openModal(e)}
                >
                    { serviceOrdered ? 'Service Ordered!' : 'Order Service'}
                </div>
                :
                <Fragment/>
            }
            {
                modalIsOpen
                ?
                <Modal
                    heading={"Order Service"}
                    text={`Do you wish to book the ${service.title} service from this provider?`}
                    onConfirm={orderServiceAndCloseModal}
                    onClose={closeModal}
                />
                :
                <Fragment/>
            }
        </div>
    )
}

export default ServiceCard