import { useContext } from "react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AlertMessageContext } from "../../context/alert-message.context";
import RatingDisplayComponent from "../rating-display-component/rating-display.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";
import ServiceCard from "../service-card/service-card.component";

import './provider-profile-page.styles.scss';
import { apiCall } from "../../api/api-call";

const ProviderProfilePage = () => {

    const alertMessageContext = useContext(AlertMessageContext);
    const {displayError} = alertMessageContext;

    const { providerId } = useParams();

    const [provider, setProvider] = useState(undefined);
    const [providerServices, setProviderServices] = useState([]);

    useEffect(() => {
        apiCall('/users/get-single-user', 'POST', {userId: providerId}, displayError, undefined).then(response => setProvider(response));
        apiCall('/users/get-user-specific-services', 'POST', {userId: providerId}, displayError, undefined).then(response => setProviderServices(response));
    }, [])

    return(
        <Fragment>
            {
                provider
                ?
                <div className="page-container">
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer picture={provider.profilePicture} serviceOrUser={'user'} size={'round-image-container-page'}/>
                        <div>
                            <h3>{provider.firstName + " " + provider.lastName}</h3>
                            <div className="provider-name">{'@' + provider.userName}</div>
                        </div> 
                    </div>
                    <div className="provider-profile-body-container">
                        <div>Location + Radius/Mobile/Stationary</div>
                        <RatingDisplayComponent rating={provider.rating} clickable/>
                        <div>{provider.profileDescription}</div>
                        <h3>Services</h3>
                        {
                            providerServices.length > 0
                            ?
                            providerServices.map((service) => {
                                    return(
                                        <ServiceCard
                                            key={service.id}
                                            service={service}
                                            providingUserId={provider.id}
                                            providingUserFirstName={provider.firstName}
                                            providingUserLastName={provider.lastName}
                                            orderButtonExists={true}
                                        />
                                    )
                            })
                            :
                            <div className="text">This provider is currently not offering any services.</div>
                        }
                    </div>
                </div>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
        
    )
}

export default ProviderProfilePage