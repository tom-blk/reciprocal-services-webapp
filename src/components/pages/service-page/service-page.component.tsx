import { Fragment, useState, useEffect, useContext } from "react";
import { Service } from "../../../types/services";
import { ServiceSpecificProvider } from "../../../types/users";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";

import ButtonComponent from "../../buttons/button.component";
import PageContainer from "../../../utils/page-container/page-container.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import ProviderCard from "../../cards/provider-card/provider-card.component";
import AddOrRemoveSingleUserServiceModal from "../../modals/addSingleServiceToUserServices/add-or-remove-single-user-service-modal.component";

import { useParams } from "react-router"

import { getAverageCreditsPerHour, getLocalServiceSpecificUsers} from "../../../api/services/read";
import { getServiceUserAffiliation } from "../../../api/users/read";
import { getService } from "../../../api/services/read";

import './service-page.styles.scss';
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions } from "../../alerts/alertMessageTypes";


const ServicePage = () => {

    const { serviceId } = useParams(); 
    const serviceIdInt = parseInt(serviceId!)

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const {id, country, postCode} = user!;

    const [service, setService] = useState<Service | undefined>(undefined);
    const [serviceProviders, setServiceProviders] = useState<ServiceSpecificProvider[]>([]);
    const [providedByCurrentUser, setProvidedByCurrentUser] = useState(false);
    const [averageCreditsPerHour, setAverageCreditsPerHour] = useState<number | undefined>(undefined);

    useEffect(() => {
        getService(serviceIdInt)
            .then(response => {setService(response)})
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [serviceIdInt])

    useEffect(() => {
        if(country && postCode)
        getLocalServiceSpecificUsers(serviceIdInt, country, postCode, id)
            .then(response => setServiceProviders(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [serviceIdInt, country, postCode, id])

    useEffect(() => {
        getServiceUserAffiliation(id, serviceIdInt)
            .then(response => setProvidedByCurrentUser(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [id, serviceIdInt])

    useEffect(() => {
        if(country && postCode)
        getAverageCreditsPerHour(serviceIdInt, country, postCode)
            .then(response => setAverageCreditsPerHour(Math.round(response * 10) / 10))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [serviceIdInt, country, postCode])

    const toggleProvidedByCurrentUser = (addOrRemove: string) => {
        if(addOrRemove === "add")
            setProvidedByCurrentUser(true)
        if(addOrRemove === "remove")
            setProvidedByCurrentUser(false)
    }

    const toggleModalHandler = () => {
        if(service)
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
                            <RoundImageContainer pictureIsPresent={service.icon} serviceOrUserId={serviceIdInt} serviceOrUser={'service'} size={'round-image-container-page'}/>
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