import { Fragment } from "react";
import { useNavigate, useParams } from "react-router"
import { members } from "../../datamodels/members/members-examples";
import { services } from "../../datamodels/services/services-examples";
import ProfileAvatar from "../profile-avatar/profile-avatar.component";
import ServiceCard from "../service-card/service-card.component";

import './provider-profile-page.styles.scss';

const ProviderProfilePage = () => {

    let { providerId } = useParams();

    const navigate = useNavigate();

    const providerIdInt = parseInt(providerId);
    
    const currentProvider = members.find(provider => provider.id === providerIdInt)

    return(
        <Fragment>
            {
                currentProvider != undefined
                ?
                <div className="page-container">
                    <div className="povider-profile-heading-container">
                        <ProfileAvatar picture={currentProvider.profilePicture} size={'page'}/>
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
                            services.map((service) => {
                                if(currentProvider.providableServices.includes(service.id)){
                                    return(
                                        <div key={service.id} onClick={e => navigate(`/services/${service.id}`)}>
                                            <ServiceCard
                                                title={service.name} 
                                                description={service.description}
                                                icon={service.icon}
                                            />
                                        </div>
                                    )
                                }
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