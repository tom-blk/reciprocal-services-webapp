import { useContext, useEffect, useState } from "react";
import { MaybeUserSpecificService } from "../../../types/services";
import { Provider } from "../../../types/users";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";

import ButtonComponent from "../../buttons/button.component";
import CardComponent from "../card.component";
import OrderServiceModal from "../../modals/orderService/orderServiceModal";
import RoundImageContainer from "../../round-image-container/round-image-container.component";

import { useNavigate } from "react-router";

import { getLocalServiceProviderCount } from "../../../api/services/read";

import './service-card.styles.scss';
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions } from "../../alerts/alertMessageTypes";

interface LocalServiceProviderCount{
    providerCount: undefined | number;
}

interface Props{
    service: MaybeUserSpecificService;
    providerInfo?: Provider;
}

const ServiceCard = ({ service, providerInfo }: Props) => {
    const { id, name, description, icon } = service;

    const { user } = useContext(UserContext);

    const { toggleModal } = useContext(ModalContext);

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [localServiceProviderCount, setLocalServiceProviderCount] = useState<LocalServiceProviderCount | undefined>(undefined);

    useEffect(() => {
        if(!providerInfo && user!.country && user!.postCode)
        getLocalServiceProviderCount(id, user!.country, user!.postCode, user!.id)
            .then(response => setLocalServiceProviderCount(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [id, user, providerInfo])

    const onClickHandler = () => navigate(`/services/${id}`)

    const openModal = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if(service.creditsPerHour && providerInfo)
        toggleModal(
            <OrderServiceModal
                providingUser={providerInfo} 
                serviceId={id} 
                serviceName={name} 
                serviceOrderedCallback={setServiceOrderedHandler}
                embersPerHour={service.creditsPerHour}
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
                    <RoundImageContainer pictureIsPresent={icon} serviceOrUserId={id} serviceOrUser={'service'} size={'round-image-container-card'}/>
                    <div className="overflow-control">
                        <div className="heading-secondary overflow-control">{name}</div>
                        <div className="text overflow-control">{description}</div>
                    </div>
                </div>

                {
                providerInfo && service.creditsPerHour
                &&
                <div className="service-card-center-data-container nowrap">
                    <span className="bold">{service.creditsPerHour} </span>
                    <span>Embers per Hour</span> 
                </div>
                }

                { (!providerInfo && user!.postCode) && <div className="nowrap">{`Providers in Your ZIP Area: ${localServiceProviderCount ? localServiceProviderCount.providerCount : "Error"}`}</div> }

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