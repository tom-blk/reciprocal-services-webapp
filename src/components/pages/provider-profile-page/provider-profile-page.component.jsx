import { Fragment, useEffect, useState, useContext } from "react";

import { useParams } from "react-router"

import { AlertMessageContext } from "../../../context/alert-message.context";

import RatingDisplayComponent from "../../rating/rating-display-component/rating-display.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import ServiceCard from "../../cards/service/service-card.component";
import PageContainer from "../../../utils/page-container/page-container.component";

import './provider-profile-page.styles.scss';

import { getSingleUser, getUserCountry, getUserSpecificServices } from "../../../api/users/read";
import { getFileUrl } from "../../../utils/web3storage/web3storage";
import { assertDisplayName } from "../../../helper-functions/users/assertDisplayName";
import ServicesList from "../../card-lists/services-list/services-list.component";


const ProviderProfilePage = () => {

    const alertMessageContext = useContext(AlertMessageContext);
    const { displayError } = alertMessageContext;

    const { providerId } = useParams();

    const [provider, setProvider] = useState(undefined);
    const [providerServices, setProviderServices] = useState([]);
    const [profilePictureUrl, setProfilePictureUrl] = useState(undefined);
    const [providerCountry, setProviderCountry] = useState(undefined);

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
        if(provider)
        getUserCountry(provider.country)
            .then(response => setProviderCountry(response.name))
            .catch(error => displayError(error))
    }, [provider])

    return(
        <Fragment>
            {
                provider
                ?
                <PageContainer>
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer picture={profilePictureUrl} serviceOrUser={'user'} size={'round-image-container-page'}/>
                        <div className="name-and-username-container">
                            <h2 className="overflow-control-wrap">{assertDisplayName(provider)}</h2>
                            <div className="sub-text overflow-control">{'@' + provider.userName}</div>
                            <RatingDisplayComponent rating={provider.rating} clickable/>
                        </div> 
                    </div>

                    <div className="page-container-item-group">
                        <h2>Location</h2>
                        <span className="page-container-content">{provider.postCode} {provider.city}, {providerCountry}</span>
                        <span className="page-container-content">{provider.travellingForOrders ? 'Travelling For Orders' :  'Not Travelling For Orders'}</span>
                    </div>

                    <div className="page-container-item-group">
                        <h2>Description</h2>
                        <span className="page-container-content">{provider.profileDescription}</span>
                    </div>

                    <h2>Providable Services</h2>
                    <ServicesList services={providerServices} providerInfo={{id: providerId, firstName: provider.firstName, lastName: provider.lastName}}/>
                </PageContainer>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
        
    )
}

export default ProviderProfilePage