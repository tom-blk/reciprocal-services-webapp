import { Fragment, useEffect, useState} from "react";
import { Provider } from "../../../types/users";

import { useParams } from "react-router"

import RatingDisplayComponent from "../../rating/rating-display-component/rating-display.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import PageContainer from "../../../utils/page-container/page-container.component";
import ServicesList from "../../card-lists/services-list/services-list.component";

import './provider-profile-page.styles.scss';

import { getSingleUser, getUserCountry, getUserSpecificServices } from "../../../api/users/read";
import { assertDisplayName } from "../../../helper-functions/users/assertDisplayName";
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions } from "../../alerts/alertMessageTypes";


const ProviderProfilePage = () => {

    const { providerId } = useParams();
    const providerIdInt = parseInt(providerId!);

    const [provider, setProvider] = useState<Provider | undefined>(undefined);
    const [providerServices, setProviderServices] = useState([]);
    const [providerCountry, setProviderCountry] = useState(undefined);

    useEffect(() => {
        getSingleUser(providerIdInt)
            .then(response => setProvider(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        getUserSpecificServices(providerIdInt)
            .then(response => setProviderServices(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [providerIdInt])

    useEffect(() => {
        if(provider)
        getUserCountry(provider.country)
            .then(response => setProviderCountry(response.name))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [provider])

    return(
        <Fragment>
            {
                provider
                ?
                <PageContainer>
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer pictureIsPresent={provider.profilePicture} serviceOrUserId={providerIdInt} serviceOrUser={'user'} size={'round-image-container-page'}/>
                        <div className="name-and-username-container">
                            <h2 className="overflow-control-wrap">{assertDisplayName(provider)}</h2>
                            <div className="sub-text overflow-control">{'@' + provider.userName}</div>
                            <RatingDisplayComponent rating={provider.rating}/>
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
                    <ServicesList services={providerServices} providerInfo={provider}/>
                </PageContainer>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
        
    )
}

export default ProviderProfilePage