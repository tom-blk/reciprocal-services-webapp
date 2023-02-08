import { Fragment, useContext, useEffect, useState } from "react";

import RatingDisplayComponent from "../../components/rating-display-component/rating-display.component";
import ServicesList from "../../components/services-list/services-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";
import EditButton from "../../components/edit-button/edit-button.component";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import { getFullUser } from "../../api/users/get-single-user";
import { getUserSpecificServices } from "../../api/services/get-user-specific-services";

import { useNavigate } from "react-router";

const UserProfile = () => {

    const { testUser } = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext);

    const [user, setUser] = useState(undefined);
    const [userServices, setUserServices] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        getFullUser(testUser.id, displayError).then(response => setUser(response))
        getUserSpecificServices(testUser.id, displayError).then(response => setUserServices(response));
    }, [])

    const navigateToUserEditProfile = () => {
        navigate('/userProfile-edit')
    }

    return(
        <PageContainer>
            {
                user
                ?
                <Fragment>
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer size="page" serviceOrUser={'user'} picture={user.profilePicture}/>
                        <div>
                            <h1>{`${user.firstName} ${user.lastName}`}</h1>
                            <span className="sub-text">{`@${user.userName}`}</span>
                        </div>
                    </div>
                    <RatingDisplayComponent rating={user.rating}/>
                    <span>Location</span>
                    <span>{user.mobility ? 'Traveling Radius: ' + user.mobility : 'Not Traveling for Orders.'}</span>
                    <h2>Providable Services</h2>
                    <ServicesList services={userServices}/>
                    <div>{user.profileDescription}</div>
                    <EditButton onClickHandler={navigateToUserEditProfile} size="50px"/>
                </Fragment>
                :
                <span>Sorry, this user is not available...</span>
            }
        </PageContainer>
    )
}

export default UserProfile