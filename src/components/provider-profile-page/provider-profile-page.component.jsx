import { Fragment } from "react";
import { useParams } from "react-router"
import { members } from "../../datamodels/members/members-examples";
import { services } from "../../datamodels/services/services-examples";
import RoundImageContainer from "../profile-avatar/round-image-container.component";
import ServiceCard from "../service-card/service-card.component";

import './provider-profile-page.styles.scss';

const ProviderProfilePage = () => {

    let { providerId } = useParams();

    const providerIdInt = parseInt(providerId);
    
    const currentProvider = members.find(provider => provider.id === providerIdInt)

    const currentProviderServices = services.filter(service => {return currentProvider.providableServices.includes(service.id)})

    return(
        <Fragment>
            {
                currentProvider !== undefined
                ?
                <div className="page-container">
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer picture={currentProvider.profilePicture} size={'page'}/>
                        <div>
                            <h3>{currentProvider.firstName + " " + currentProvider.lastName}</h3>
                            <div className="user-name">{'@' + currentProvider.userName}</div>
                        </div> 
                    </div>
                    <div className="provider-profile-body-container">
                        <div>Location + Radius/Mobile/Stationary</div>
                        <div>{currentProvider.profileDescription}</div>
                        <h3>Skills</h3>
                        {
                            currentProviderServices.map((service) => {
                                    return(
                                        <ServiceCard
                                            key={service.id}
                                            service={service}
                                            orderButtonExists={true}
                                        />
                                    )
                            })
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