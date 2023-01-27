import { useState } from "react";
import { useNavigate } from "react-router";
import ButtonComponent from "../button/button.component";
import CardComponent from "../card/card.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";

const ServiceCard = ({service, orderButtonExists}) => {

    const {id, icon, name, description} = service;

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState()

    const onClickHandler = () => navigate(`/services/${id}`)

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
        <CardComponent onClickHandler={onClickHandler} className="card service-card">
            <RoundImageContainer picture={icon} serviceOrUser={'service'} size={'card'}/>
            <div className="card-data-container">
                <div className="heading-secondary">{name}</div>
                <div className="text">{description}</div>
            </div>
            {
                orderButtonExists &&
                <ButtonComponent buttonType={serviceOrdered ? 'inactive' : 'confirm'}
                    onClick={e => openModal(e)}
                >
                    {serviceOrdered ? 'Service Ordered!' : 'Order Service'}
                </ButtonComponent>
            }
        </CardComponent>
    )
}

export default ServiceCard