import { Fragment, useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import RatingDisplayComponent from "../../components/rating-display-component/rating-display.component";
import ServicesList from "../../components/services-list/services-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";
import EditButton from "../../components/edit-button/edit-button.component";

import { useNavigate } from "react-router";

import { getUserSpecificServices } from "../../api/users/read";
import { getFileUrl } from "../../utils/web3storage/web3storage";

import './user-profile.styles.scss';

const UserProfile = () => {

    const { user } = useContext(UserContext);
    const { firstName, lastName, userName, rating, profileDescription } = user;
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

    const assertDisplayName = () => {
        if(firstName && lastName){
            return(firstName + ' ' + lastName);
        } else if (firstName && !lastName){
            return firstName;
        } else if (!firstName && !lastName){
            return userName;
        }
    }

    return(
        <PageContainer>
            {
                user
                ?
                <Fragment>
                    <div className="profile-heading-and-edit-button-container">
                        <div className="povider-profile-heading-container">
                            <RoundImageContainer size="round-image-container-page" serviceOrUser={'user'} picture={profilePicture}/>
                            <div>
                                <h1>{assertDisplayName()}</h1>
                                <span className="sub-text">{`@${userName}`}</span>
                            </div>
                        </div>
                        <EditButton size={getComputedStyle(document.body).getPropertyValue('--round-button')} onClickHandler={navigateToUserEditProfile}/>
                    </div>
                    <RatingDisplayComponent rating={rating}/>
                    <span>Location</span>
                    <span>{user.mobility ? 'Traveling Radius: ' + user.mobility : 'Not Traveling for Orders.'}</span>
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