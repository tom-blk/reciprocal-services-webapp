import { useNavigate } from "react-router";
import RoundImageContainer from "../profile-avatar/round-image-container.component";

const ProviderCard = ({ provider }) => {

    const navigate = useNavigate()

    return(
        <div onClick={e => navigate(`/providers/${provider.id}`)} className="card">
            <RoundImageContainer picture={provider.profilePicture} size={'card'}/>
            <div className="heading-secondary">{provider.firstName + ' ' + provider.lastName}</div>
        </div>
    )
}

export default ProviderCard