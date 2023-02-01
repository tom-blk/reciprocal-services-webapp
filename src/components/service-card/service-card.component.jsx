import { Fragment, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModalContext } from "../../context/modal.context";
import ButtonComponent from "../button/button.component";
import CardDataContainer from "../card-data-container/card-data-container.component";
import CardComponent from "../card/card.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";

const ServiceCard = ({service, orderButtonExists}) => {
    const { id, icon, name, description } = service;

    const { toggleModal } = useContext(ModalContext);

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);

    const onClickHandler = () => navigate(`/services/${id}`)

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(<OrderServiceModal serviceName={name}/>);
    }

    const closeModal = (e) => {
        e.stopPropagation();
    }

    return(
        <CardComponent onClickHandler={onClickHandler} className="card service-card">
            <CardDataContainer>
                <RoundImageContainer picture={icon} serviceOrUser={'service'} size={'card'}/>
                <div className="heading-secondary">{name}</div>
                <div className="text">{description}</div>
            </CardDataContainer>
            {
                orderButtonExists &&
                <ButtonComponent buttonType={serviceOrdered ? 'inactive' : 'confirm'}
                    onClickHandler={openModal}
                >
                    {serviceOrdered ? 'Service Ordered!' : 'Order Service'}
                </ButtonComponent>
            }
        </CardComponent>
    )
}

export default ServiceCard

//THE FOLLOWING COMPONENT GETS PASSED TO THE MODAL VIA toggleModal()

const OrderServiceModal = ({serviceName}) => {

    const { toggleModal } = useContext(ModalContext);

    return(
        <Fragment>
            <h2>{`Do you really wish to order the service ${serviceName}?`}</h2>
            <ButtonComponent buttonType={'confirm'}>{'Confirm'}</ButtonComponent>
            <ButtonComponent onClickHandler={toggleModal} buttonType={'cancel'}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}