import { Fragment } from "react";
import { useParams } from "react-router"
import { members } from "../../datamodels/members/members-examples";
import { services } from "../../datamodels/services/services-examples";
import ProfileAvatar from "../profile-avatar/profile-avatar.component";

const ProviderProfilePage = () => {

    let { providerId } = useParams();

    const providerIdInt = parseInt(providerId);
    
    const currentProvider = members.find(provider => provider.id === providerIdInt)

    return(
        <Fragment>
            {
                currentProvider != undefined
                ?
                <div>
                    <ProfileAvatar picture={currentProvider.profilePicture} size={'page'}/>
                    <h3>{currentProvider.firstName + " " + currentProvider.lastName}</h3>
                    <div>{'@' + currentProvider.userName}</div>
                    <div>Location + Radius/Mobile/Stationary</div>
                    <div>{currentProvider.profileDescription}</div>
                    <div>Skilllist</div>
                    {
                        services.map((service) => {
                            if(currentProvider.providableServices.includes(service.id)){
                                return(
                                    <div key={service.id}>{service.name}</div>
                                )
                            }
                        })
                    }
                </div>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
        
    )
}

export default ProviderProfilePage