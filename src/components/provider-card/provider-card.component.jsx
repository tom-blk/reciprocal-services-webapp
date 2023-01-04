import ProfileAvatar from "../profile-avatar/profile-avatar.component";

const ProviderCard = ({ provider }) => {

    return(
        <div className="card">
            <ProfileAvatar picture={provider.profilePicture} size={'card'}/>
            <div className="heading-secondary">{provider.firstName + ' ' + provider.lastName}</div>
        </div>
    )
}

export default ProviderCard