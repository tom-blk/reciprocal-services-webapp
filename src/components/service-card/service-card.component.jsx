import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModalContext } from "../../context/modal.context";
import ButtonComponent from "../button/button.component";
import CardComponent from "../card/card.component";
import OrderServiceModal from "../modal/orderServiceModal";
import RoundImageContainer from "../round-image-container/round-image-container.component";

import './service-card.styles.scss';
import { AlertMessageContext } from "../../context/alert-message.context";
import { getServiceProviderCount } from "../../api/services/read";
import { getFileUrl } from "../../utils/web3storage/web3storage";

const ServiceCard = ({ service, providingUserId, providingUserFirstName, providingUserLastName, orderButtonExists }) => {
    const { id, icon, name, description } = service;

    const { toggleModal } = useContext(ModalContext);
    const { displayError } = useContext(AlertMessageContext);

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [serviceProviderCount, setServiceProviderCount] = useState(0);
    const [serviceIcon, setServiceIcon] = useState(undefined);

    useEffect(() => {
        if(icon)
        getFileUrl(icon, displayError).then(response => setServiceIcon(response));
        getServiceProviderCount(service.id, displayError).then(response => setServiceProviderCount(response));
    }, [])

    const onClickHandler = () => navigate(`/services/${id}`)

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(
            <OrderServiceModal
                providingUserId={providingUserId} 
                providingUserFirstName={providingUserFirstName}
                providingUserLastName={providingUserLastName}
                serviceId={id} 
                serviceName={name} 
                serviceOrderedCallback={setServiceOrderedHandler}
            />
        );
    }

    const setServiceOrderedHandler = () => {
        setServiceOrdered(true);
    }

    return(
        <CardComponent onClickHandler={onClickHandler} className="card service-card">
            <div className="service-card-main-data-container">
                <div className="service-card-left-data-container">
                    <RoundImageContainer picture={serviceIcon} serviceOrUser={'service'} size={'round-image-container-card'}/>
                    <div>
                        <div className="heading-secondary">{name}</div>
                        <div className="text">{description}</div>
                    </div>
                </div>
                { !orderButtonExists && <div className="heading-secondary">{`${serviceProviderCount.providerCount} Providers`}</div> }
                {
                    orderButtonExists 
                    &&
                    <ButtonComponent 
                        buttonType={serviceOrdered ? 'inactive' : 'confirm'}
                        onClickHandler={openModal}
                    >
                        {serviceOrdered ? 'Service Ordered!' : 'Order Service'}
                    </ButtonComponent>
                }
            </div>
            
        </CardComponent>
    )
}

export default ServiceCard