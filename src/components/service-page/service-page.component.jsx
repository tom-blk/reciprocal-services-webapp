import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router"
import { AlertMessageContext } from "../../context/alert-message.context";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";
import ProviderCard from "../provider-card/provider-card.component";
import { getServiceSpecificUsers } from "../../api/users/get-service-specific-users";
import { getFileUrl } from "../../utils/web3storage/web3storage";
import ButtonComponent from "../button/button.component";
import { ModalContext } from "../../context/modal.context";
import ConfirmOrCancelModal from "../modal/confirm-or-cancel-modal.component";
import { removeServiceFromUserServices } from "../../api/users/remove-service-from-user-services";
import { addServiceToUserServices } from "../../api/users/add-service-to-user-services";
import { UserContext } from "../../context/user.context";
import { getServiceUserAffiliation } from "../../api/users/get-service-user-affiliation";

const ServicePage = () => {

    let { serviceId } = useParams(); 

    const {displayError, displaySuccessMessage} = useContext(AlertMessageContext);
    const {toggleModal} = useContext(ModalContext);
    const {testUser} = useContext(UserContext);

    const [service, setService] = useState(undefined);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [serviceIcon, setServiceIcon] = useState(undefined);
    const [providedByCurrentUser, setProvidedByCurrentUser] = useState(false);

    useEffect(() => {
        getFullServiceDetails();
        getServiceSpecificUsers(serviceId, displayError)
            .then(response => setServiceProviders(response));
        getServiceUserAffiliation(testUser.id, serviceId, displayError)
            .then(response => setProvidedByCurrentUser(response));
    }, [])

    useEffect(() => {
        if(service)
        if(service.icon)
        getFileUrl(service.icon, displayError).then(response => setServiceIcon(response));
    }, [service])

    useEffect(() => {
        console.log(providedByCurrentUser);
    }, [providedByCurrentUser])

    const toggleProvidedByCurrentUserStatusButtonHandler = () => {

        const removeFunction = () => {
            removeServiceFromUserServices(testUser.id, serviceId, displayError, displaySuccessMessage);
            setProvidedByCurrentUser(false);
        }

        const addFunction = () => {
            addServiceToUserServices(testUser.id, serviceId, displayError, displaySuccessMessage);
            setProvidedByCurrentUser(true);
        }

        toggleModal(
            <ConfirmOrCancelModal 
                prompt={`Do you want to ${providedByCurrentUser ? 'remove' : 'add'} this service ${providedByCurrentUser ? 'from' : 'to'} your services?`}
                onConfirm={providedByCurrentUser ? removeFunction : addFunction}
            />
        )
    }
    
    const getFullServiceDetails = () => {
        axios.post(`http://localhost:5000/get-full-service-details/${serviceId}`, {
            serviceId: serviceId
        })
        .then(response => {
            setService(response.data)
        })
        .catch(error => {
            displayError(error)
        })
    }

    return(
        <Fragment>
            {
                service !== undefined
                ?
                <PageContainer>
                    <div className="transaction-page-heading">
                        <RoundImageContainer picture={serviceIcon} serviceOrUser={'service'} size={'round-image-container-page'}/>
                        <div className="heading-primary">{service.name}</div>
                        <ButtonComponent 
                            onClickHandler={toggleProvidedByCurrentUserStatusButtonHandler} 
                            buttonType={providedByCurrentUser ? 'cancel' : 'confirm'}
                        >
                            {providedByCurrentUser ? 'Remove From Your Services' : 'Add To Your Services'}
                        </ButtonComponent>
                    </div>
                    <div className="heading-secondary">{`Average Credits per Hour: ${service.creditsPerHour}`}</div>
                    <div className="text">{service.description}</div>
                    <div className="heading-secondary">Providers:</div>
                    {
                        serviceProviders.length > 0
                        ?
                        serviceProviders.map(provider => {
                            return(
                                <ProviderCard 
                                    key={provider.id}
                                    orderButtonExists={true} 
                                    user={provider} 
                                    serviceId={service.id}
                                    serviceName={service.name}
                                />
                            )
                        })
                        :
                        <div className="text">There currently are no providers offering this service...</div>
                    }
                </PageContainer>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
    )
}

export default ServicePage