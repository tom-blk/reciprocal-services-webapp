import './profile-avatar.styles.scss';

const ProfileAvatar = ({picture, size}) => {

    const renderProfilePic = () => {
        if(!picture){
            return "https://www.svgrepo.com/download/316857/profile-simple.svg";
        } else {
            return picture;
        }
    }

    const assertSize = () => {
        if(size==="card"){
            return '--profile-avatar-size-card'
        } else if(size==="page"){
            return '--profile-avatar-size-page'
        }
    }

    return(
        <div 
            className="profile-avatar-container" 
            style={{
                backgroundImage: `url(${renderProfilePic()})`,
                width: `var(${assertSize()})`,
                height: `var(${assertSize()})`
            }}
        />
    )
}

export default ProfileAvatar