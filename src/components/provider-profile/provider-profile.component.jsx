const ProviderProfile = () => {
    return(
        <div>
            <div className="profile-pic" style={{backgroundColor: "blue", height: "50px", width: "50px"}}></div>
            <h3>Full Name</h3>
            <div>{'@' + 'username'}</div>
            <div>Location + Radius/Mobile/Stationary</div>
            <div>Skilllist</div>
            <div>Text about the user</div>
        </div>
    )
}

export default ProviderProfile