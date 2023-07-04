import { useContext, useEffect, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ButtonComponent from "../../buttons/button.component";
import CardComponent from "../card.component";
import OrderServiceModal from "../../modals/orderService/orderServiceModal";
import RoundImageContainer from "../../round-image-container/round-image-container.component";

import { useNavigate } from "react-router";

import { getServiceProviderCount } from "../../../api/services/read";
import { getFileUrl } from "../../../utils/web3storage/web3storage";

import './service-card.styles.scss';

const ServiceCard = ({ service, providingUserId, providingUserFirstName, providingUserLastName, isProviderRelated, embersPerHour }) => {
    const { id, icon, name, description } = service;

    const { toggleModal } = useContext(ModalContext);
    const { displayError } = useContext(AlertMessageContext);

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [serviceProviderCount, setServiceProviderCount] = useState(0);
    const [serviceIcon, setServiceIcon] = useState(undefined);

    useEffect(() => {
        if(icon)
        getFileUrl(icon, displayError)
            .then(response => setServiceIcon(response))
            .catch(error => displayError(error))
        if(!isProviderRelated)
        getServiceProviderCount(service.id, displayError)
            .then(response => setServiceProviderCount(response))
            .catch(error => displayError(error))
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
                embersPerHour={embersPerHour}
            />
        );
    }

    const setServiceOrderedHandler = () => {
        setServiceOrdered(true);
    }

    return(
        <CardComponent onClickHandler={onClickHandler}>
            
            <div className="service-card-main-data-container">
                <div className="service-card-left-data-container overflow-control">
                    <RoundImageContainer picture={serviceIcon} serviceOrUser={'service'} size={'round-image-container-card'}/>
                    <div className="overflow-control">
                        <div className="heading-secondary overflow-control">{name}</div>
                        <div className="text overflow-control">{description}</div>
                    </div>
                </div>

                {
                isProviderRelated
                &&
                <div className="service-card-center-data-container">
                    <span className="bold">{embersPerHour} </span>
                    <span>Embers per Hour</span> 
                </div>
                }

                { !isProviderRelated && <div className="heading-secondary nowrap">{`${serviceProviderCount.providerCount} Providers`}</div> }

                {
                    isProviderRelated 
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