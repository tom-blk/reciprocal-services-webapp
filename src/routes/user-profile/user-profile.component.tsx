import React, { Fragment, useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";

import RatingDisplayComponent from "../../components/rating/rating-display-component/rating-display.component";
import ServicesList from "../../components/card-lists/services-list/services-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";
import RoundButton from "../../components/buttons/round-button/round-button.component";

import { useNavigate } from "react-router";

import { assertDisplayName } from "../../helper-functions/users/assertDisplayName";

import { getUserCountry, getUserSpecificServices } from "../../api/users/read";

import './user-profile.styles.scss';
import { toast } from "react-toastify";
import AlertMessageComponent from "../../components/alerts/alert-message.component";
import { errorMessageOptions } from "../../components/alerts/alertMessageTypes";

const UserProfile = () => {

    const { user } = useContext(UserContext);
    const { id, userName, rating, profileDescription, country } = user!;

    const [userServices, setUserServices] = useState([]);
    const [userCountry, setUserCountry] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        getUserSpecificServices(id)
            .then(response => setUserServices(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [id])

    useEffect(() => {
        if(country)
        getUserCountry(country)
            .then(response => setUserCountry(response.name))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [country])

    const navigateToUserEditProfile = () => {
        navigate('/userProfile-edit')
    }

    return(
        <PageContainer>
            {
                user
                ?
                <Fragment>
                    <div className="profile-heading-and-edit-button-container">
                        <div className="user-profile-heading-container">
                            <RoundImageContainer pictureIsPresent={user.profilePicture} serviceOrUserId={user.id} size="round-image-container-page" serviceOrUser={'user'}/>
                            <div className="name-and-username-container">
                                <h2 className="overflow-control">{assertDisplayName(user)}</h2>
                                <span className="sub-text">{`@${userName}`}</span>
                                <RatingDisplayComponent rating={rating}/>
                            </div>
                        </div>
                        <RoundButton /*size={getComputedStyle(document.body).getPropertyValue('--round-button')}*/ type={'edit'} onClickHandler={navigateToUserEditProfile}/>
                    </div>
                    {
                        user.postCode || user.city || userCountry
                        ?
                        <div className="page-container-item-group">
                            <h2>Location</h2>
                            <span className="page-container-content">{user.postCode}{user.city && ` ${user.city}`}{((user.city && userCountry) || (user.postCode && userCountry)) && ', '}{userCountry && `${userCountry}`}</span>
                            <span className="page-container-content">{user.travellingForOrders ? 'Travelling For Orders' :  'Not Travelling For Orders'}</span>
                        </div>
                        :
                        <Fragment/>
                    }
                    <div className="page-container-item-group">
                        <h2>Description</h2>
                        <span className="page-container-content">{profileDescription}</span>
                    </div>
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