import { useContext, useEffect, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ButtonComponent from "../../buttons/button.component";
import CardComponent from "../card.component";
import OrderServiceModal from "../../modals/orderService/orderServiceModal";
import RoundImageContainer from "../../round-image-container/round-image-container.component";

import { useNavigate } from "react-router";

import { getLocalServiceProviderCount } from "../../../api/services/read";
import { getFileUrl } from "../../../utils/web3storage/web3storage";

import './service-card.styles.scss';
import { UserContext } from "../../../context/user.context";

const ServiceCard = ({ service, providerInfo }) => {
    const { creditsPerHour, id, icon, name, description } = service;

    const { user } = useContext(UserContext);
    const { toggleModal } = useContext(ModalContext);
    const { displayError } = useContext(AlertMessageContext);

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [localServiceProviderCount, setLocalServiceProviderCount] = useState(0);
    const [serviceIcon, setServiceIcon] = useState(undefined);

    useEffect(() => {
        if(icon)
        getFileUrl(icon, displayError)
            .then(response => setServiceIcon(response))
            .catch(error => displayError(error))
        if(!providerInfo)
        getLocalServiceProviderCount(service.id, user.country, user.postCode, user.id)
            .then(response => setLocalServiceProviderCount(response))
            .catch(error => displayError(error))
    }, [])

    const onClickHandler = () => navigate(`/services/${id}`)

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(
            <OrderServiceModal
                providingUserId={providerInfo.providingUserId} 
                providingUserFirstName={providerInfo.firstName}
                providingUserLastName={providerInfo.lastName}
                serviceId={id} 
                serviceName={name} 
                serviceOrderedCallback={setServiceOrderedHandler}
                embersPerHour={creditsPerHour}
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
                providerInfo
                &&
                <div className="service-card-center-data-container nowrap">
                    <span className="bold">{creditsPerHour} </span>
                    <span>Embers per Hour</span> 
                </div>
                }

                { !providerInfo && <div className="nowrap">{`Providers in Your ZIP Area: ${localServiceProviderCount.providerCount}`}</div> }

                {
                    providerInfo 
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