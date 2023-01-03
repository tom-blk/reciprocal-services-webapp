import './profile-avatar.styles.scss';

const ProfileAvatar = ({picture}) => {

    const renderProfilePic = () => {
        if(!picture){
            return "https://www.svgrepo.com/download/316857/profile-simple.svg";
        } else {
            return picture;
        }
    }

    return(
        <div className="profile-avatar-container" style={{backgroundImage: `url(${renderProfilePic()})`}}/>
    )
}

export default ProfileAvatar