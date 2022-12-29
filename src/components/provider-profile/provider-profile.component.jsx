import { Fragment } from "react";
import { useParams } from "react-router"
import { members } from "../../datamodels/members/members-examples";

const ProviderProfile = () => {

    let { providerId } = useParams();

    const providerIdInt = parseInt(providerId);
    
    const currentProvider = members.find(provider => provider.id === providerIdInt)

    return(
        <Fragment>
            {
                currentProvider != undefined
                ?
                <div>
                    <div className="profile-pic" style={{backgroundColor: "blue", height: "50px", width: "50px"}}></div>
                    <h3>{members[providerId].firstName + " " + members[providerId].lastName}</h3>
                    <div>{'@' + members[providerId].userName}</div>
                    <div>Location + Radius/Mobile/Stationary</div>
                    <div>Skilllist</div>
                    <div>{members[providerId].profileDescription}</div>
                </div>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
        
    )
}

export default ProviderProfile