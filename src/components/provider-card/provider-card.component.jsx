import ProfileAvatar from "../profile-avatar/profile-avatar.component";

const ProviderCard = ({ provider }) => {

    return(
        <div className="card">
            <ProfileAvatar picture={provider.profilePicture} size={'card'}/>
            <h3 className="provider-card-last-name">{provider.firstName + ' ' + provider.lastName}</h3>
        </div>
    )
}

export default ProviderCard