import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router"
import { AlertMessageContext } from "../../context/alert-message.context";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";
import ProviderCard from "../provider-card/provider-card.component";

const ServicePage = () => {

    let { serviceId } = useParams(); 

    const {displayError} = useContext(AlertMessageContext);

    const [service, setService] = useState(undefined);
    const [serviceProviders, setServiceProviders] = useState([]);

    useEffect(() => {
        getFullServiceDetails();
        getServiceProviders();
    }, [])
    
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

    const getServiceProviders = () => {
        axios.post(`http://localhost:5000/get-service-specific-users/${serviceId}`, {
            serviceId: serviceId
        })
        .then(response => {
            setServiceProviders(response.data)
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
                        <RoundImageContainer picture={service.icon} serviceOrUser={'service'} size={'page'}/>
                        <div className="heading-primary">{service.name}</div>
                    </div>
                    <div className="heading-secondary">{`Credits per Hour: ${service.creditsPerHour}`}</div>
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
                                    serviceId={serviceId}
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