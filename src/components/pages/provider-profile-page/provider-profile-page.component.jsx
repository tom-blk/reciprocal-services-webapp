import { Fragment, useEffect, useState, useContext } from "react";

import { useParams } from "react-router"

import { AlertMessageContext } from "../../../context/alert-message.context";

import RatingDisplayComponent from "../../rating/rating-display-component/rating-display.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import ServiceCard from "../../cards/service/service-card.component";

import './provider-profile-page.styles.scss';

import { getSingleUser, getUserSpecificServices } from "../../../api/users/read";
import { getFileUrl } from "../../../utils/web3storage/web3storage";

const ProviderProfilePage = () => {

    const alertMessageContext = useContext(AlertMessageContext);
    const { displayError } = alertMessageContext;

    const { providerId } = useParams();

    const [provider, setProvider] = useState(undefined);
    const [providerServices, setProviderServices] = useState([]);
    const [profilePictureUrl, setProfilePictureUrl] = useState(undefined)

    useEffect(() => {
        getSingleUser(providerId)
            .then(response => setProvider(response))
            .catch(error => displayError(error))
        getUserSpecificServices(providerId)
            .then(response => setProviderServices(response))
            .catch(error => displayError(error))
    }, [])

    useEffect(() => {
        console.log(provider)
    }, [provider])

    useEffect(() => {
        if(provider?.profilePicture)
        getFileUrl(provider.profilePicture, displayError)
            .then(response => setProfilePictureUrl(response))
            .catch(error => displayError(error))
    }, [provider])

    return(
        <Fragment>
            {
                provider
                ?
                <div className="page-container">
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer picture={profilePictureUrl} serviceOrUser={'user'} size={'round-image-container-page'}/>
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
                                            isProviderRelated
                                            embersPerHour={service.creditsPerHour}
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