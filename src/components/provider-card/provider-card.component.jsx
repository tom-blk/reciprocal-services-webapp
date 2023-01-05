import RoundImageContainer from "../profile-avatar/round-image-container.component";

const ProviderCard = ({ provider }) => {

    return(
        <div className="card">
            <RoundImageContainer picture={provider.profilePicture} size={'card'}/>
            <div className="heading-secondary">{provider.firstName + ' ' + provider.lastName}</div>
        </div>
    )
}

export default ProviderCard