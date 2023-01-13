import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import Modal from '../modal/modal.component'
import RoundImageContainer from "../round-image-container/round-image-container.component";
import "./service-card.styles.scss";

const ServiceCard = ({service, orderButtonExists}) => {

    const {id, icon, name, description} = service;

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState()

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
        <div onClick={e => navigate(`/services/${id}`)} className="card service-card">
            <RoundImageContainer picture={icon} size={"card"}/>
            <div className="card-data-container">
                <div className="heading-secondary">{name}</div>
                <div className="text">{description}</div>
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