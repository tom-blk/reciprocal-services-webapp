const UserProfile = () => {

    const icon = false;

    const renderProfilePic = () => {
        if(!icon){
            return "https://www.svgrepo.com/download/390671/profile-user-avatar-man-person.svg";
        } else {
            return icon;
        }
    }

    return(
        <div>
            <img className="image-icon" src={renderProfilePic()}/>
            <h3>Full Name</h3>
            <div>{'@' + 'username'}</div>
            <div>Location + Radius/Mobile/Stationary</div>
            <div>Skilllist</div>
            <div>Text about the user</div>
        </div>
    )
}

export default UserProfile