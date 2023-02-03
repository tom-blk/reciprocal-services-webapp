import { Fragment, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModalContext } from "../../context/modal.context";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import ButtonComponent from "../button/button.component";
import CardDataContainer from "../card-data-container/card-data-container.component";
import CardComponent from "../card/card.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";
import { createOrder } from "../../api/orders/create-order";

const ServiceCard = ({ service, providingUserId, orderButtonExists }) => {
    const { id, icon, name, description } = service;

    const { toggleModal } = useContext(ModalContext);

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);

    const onClickHandler = () => navigate(`/services/${id}`)

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(<OrderServiceModal serviceId={id} serviceName={name} providingUserId={providingUserId} />);
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

const OrderServiceModal = ({ providingUserId, serviceId, serviceName }) => {

    const { toggleModal } = useContext(ModalContext);
    const { testUser } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const orderData = {
        serviceId: serviceId,
        providingUserId: providingUserId,
        receivingUserId: testUser.id
    }

    const onClickHandler = () => {
        createOrder(orderData, displaySuccessMessage, displayError);
        toggleModal();
    }

    return(
        <Fragment>
            <h2>{`Do you really wish to Order the Service ${serviceName} from  this Provider?`}</h2>
            <ButtonComponent buttonType={'confirm'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}