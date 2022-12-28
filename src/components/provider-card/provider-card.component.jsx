import { useNavigate } from "react-router"

const ProviderCard = ({ firstName, lastName }) => {

    const navigate = useNavigate();

    return(
        <div className="provider-card-container" onClick={(e) => navigate('provider-profile/?')}>
            <h3 className="provider-card-last-name">{firstName + ' ' +lastName}</h3>
        </div>
    )
}

export default ProviderCard