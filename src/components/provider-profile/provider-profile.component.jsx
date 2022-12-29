import { useParams } from "react-router"
import { members } from "../../datamodels/members/members-examples";

const ProviderProfile = () => {

    let { userId } = useParams();

    console.log(userId);

    return(
        <div>
            <div className="profile-pic" style={{backgroundColor: "blue", height: "50px", width: "50px"}}></div>
            <h3>{members[userId].firstName + " " + members[userId].lastName}</h3>
            <div>{'@' + members[userId].userName}</div>
            <div>Location + Radius/Mobile/Stationary</div>
            <div>Skilllist</div>
            <div>{members[userId].profileDescription}</div>
        </div>
    )
}

export default ProviderProfile