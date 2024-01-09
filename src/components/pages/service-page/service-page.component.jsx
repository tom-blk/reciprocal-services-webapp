import { Fragment, useState, useEffect, useContext } from "react";

import { AlertMessageContext } from "../../../context/alert-message.context";
import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";

import ButtonComponent from "../../buttons/button.component";
import PageContainer from "../../../utils/page-container/page-container.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import ProviderCard from "../../cards/provider-card/provider-card.component";
import AddOrRemoveSingleUserServiceModal from "../../modals/addSingleServiceToUserServices/add-or-remove-single-user-service-modal.component";

import { useParams } from "react-router"

import { getAverageCreditsPerHour, getLocalServiceSpecificUsers} from "../../../api/services/read";
import { getFileUrl } from "../../../utils/web3storage/web3storage";
import { getServiceUserAffiliation } from "../../../api/users/read";
import { getService } from "../../../api/services/read";

import './service-page.styles.scss';


const ServicePage = () => {

    let { serviceId } = useParams(); 

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);

    const [service, setService] = useState(undefined);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [serviceIcon, setServiceIcon] = useState(undefined);
    const [providedByCurrentUser, setProvidedByCurrentUser] = useState(false);
    const [averageCreditsPerHour, setAverageCreditsPerHour] = useState(undefined);

    useEffect(() => {
        getService(serviceId, displayError)
            .then(response => {setService(response)})
            .catch(error => displayError(error))
        getLocalServiceSpecificUsers(serviceId, user.country, user.postCode, user.id)
            .then(response => setServiceProviders(response))
            .catch(error => displayError(error))
        getServiceUserAffiliation(user.id, serviceId, displayError)
            .then(response => setProvidedByCurrentUser(response))
            .catch(error => displayError(error))
        getAverageCreditsPerHour(serviceId, user.country, user.postCode)
            .then(response => setAverageCreditsPerHour(Math.round(response * 10) / 10))
            .catch(error => displayError(error))
    }, [])

    useEffect(() => {
        console.log(averageCreditsPerHour);
    }, [averageCreditsPerHour])

    useEffect(() => {
        if(service)
        if(service.icon)
            getFileUrl(service.icon, displayError)
                .then(response => setServiceIcon(response))
                .catch(error => displayError(error))
    }, [service])

    const toggleProvidedByCurrentUser = (addOrRemove) => {
        if(addOrRemove === "add")
            setProvidedByCurrentUser(true)
        if(addOrRemove === "remove")
            setProvidedByCurrentUser(false)
    }

    const toggleModalHandler = () => {
        toggleModal(<AddOrRemoveSingleUserServiceModal service={service} addOrRemove={providedByCurrentUser ? 'remove' : 'add'} onConfirmCallback={toggleProvidedByCurrentUser}/>)
    }

    return(
        <Fragment>
            {
                service !== undefined
                ?
                <PageContainer>
                    <div className="service-page-heading">
                        <div className="flex overflow-control">
                            <RoundImageContainer serviceOrUserId={serviceId} picture={serviceIcon} serviceOrUser={'service'} size={'round-image-container-page'}/>
                            <div className="heading-primary overflow-control-wrap">{service.name}</div>
                        </div>
                        <ButtonComponent 
                            onClickHandler={toggleModalHandler} 
                            buttonType={providedByCurrentUser ? 'cancel' : 'confirm'}
                        >
                            {providedByCurrentUser ? 'Remove From Your Services' : 'Add To Your Services'}
                        </ButtonComponent>
                    </div>
                    <div className="heading-secondary">{`Average Credits per Hour in Your ZIP Area: ${averageCreditsPerHour ? averageCreditsPerHour : 'Not Available'}`}</div>
                    <div className="text">{service.description}</div>
                    <div className="heading-secondary">Providers in Your ZIP Area:</div>
                    <div className="card-list">
                    {
                        serviceProviders.length > 0
                        ?
                        serviceProviders.map(provider => {
                            return(
                                <ProviderCard 
                                    key={provider.id}
                                    isServiceRelated
                                    user={provider} 
                                    serviceId={service.id}
                                    serviceName={service.name}
                                    embersPerHour={provider.creditsPerHour}
                                />
                            )
                        })
                        :
                        <div className="text">There currently are no providers offering this service...</div>
                    }    
                    </div>
                </PageContainer>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
    )
}

export default ServicePage