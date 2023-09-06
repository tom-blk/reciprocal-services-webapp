import { Fragment, useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import RatingDisplayComponent from "../../components/rating/rating-display-component/rating-display.component";
import ServicesList from "../../components/card-lists/services-list/services-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";
import RoundButton from "../../components/buttons/round-button/round-button.component";

import { useNavigate } from "react-router";

import { assertDisplayName } from "../../helper-functions/users/assertDisplayName";

import { getUserSpecificServices } from "../../api/users/read";
import { getFileUrl } from "../../utils/web3storage/web3storage";

import './user-profile.styles.scss';


const UserProfile = () => {

    const { user } = useContext(UserContext);
    const { userName, rating, profileDescription } = user;

    const { displayError } = useContext(AlertMessageContext);

    const [profilePicture, setProfilePicture] = useState(undefined);
    const [userServices, setUserServices] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        getUserSpecificServices(user.id, displayError)
            .then(response => setUserServices(response))
            .catch(error => displayError(error))
    }, [])

    useEffect(() => {
        if(user)
        if(user.profilePicture)
        getFileUrl(user.profilePicture, displayError)
            .then(response => setProfilePicture(response))
            .catch(error => displayError(error))
    }, [user])

    const navigateToUserEditProfile = () => {
        navigate('/userProfile-edit')
    }

    console.log(user.location)

    return(
        <PageContainer>
            {
                user
                ?
                <Fragment>
                    <div className="profile-heading-and-edit-button-container">
                        <div className="user-profile-heading-container">
                            <RoundImageContainer size="round-image-container-page" serviceOrUser={'user'} picture={profilePicture}/>
                            <div className="name-and-username-container">
                                <h1 className="overflow-control">{assertDisplayName(user)}</h1>
                                <span className="sub-text">{`@${userName}`}</span>
                            </div>
                        </div>
                        <RoundButton size={getComputedStyle(document.body).getPropertyValue('--round-button')} type={'edit'} onClickHandler={navigateToUserEditProfile}/>
                    </div>
                    <RatingDisplayComponent rating={rating}/>
                    <span>{user.location}</span>
                    <span>{user.travelRadius && user.travelRadius > 0 ? 'Traveling Radius: ' + user.travelRadius + ' Kilometers' : 'Not Traveling for Orders.'}</span>
                    <h2>Description</h2>
                    <div>{profileDescription}</div>
                    <h2>Providable Services</h2>
                    <ServicesList services={userServices}/>
                </Fragment>
                :
                <span>Sorry, this user is not available...</span>
            }
        </PageContainer>
    )
}

export default UserProfile