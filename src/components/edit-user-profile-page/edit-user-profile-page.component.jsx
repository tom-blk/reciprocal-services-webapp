import { Fragment, useContext, useEffect, useState } from "react";

import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import { getFullUser } from "../../api/users/get-single-user";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";
import ButtonComponent from "../button/button.component";
import ServicesList from "../services-list/services-list.component";
import { getUserSpecificServices } from "../../api/services/get-user-specific-services";
import { useNavigate } from "react-router";
import { updateUser } from "../../api/users/update-user";
import { OnHoverEdit } from "../on-hover-edit-component/on-hover-edit.component";

const EditUserProfile = () => {

    const { testUser } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const [user, setUser] = useState(undefined);
    const [userServices, setUserServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getFullUser(testUser.id, displayError).then(response => setUser(response));
        getUserSpecificServices(testUser.id, displayError).then(response => setUserServices(response));
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    const editServicesButtonOnClickHandler = () => navigate(`/userProfile-edit/edit-services`);

    const cancelButtonOnClickHandler = () => navigate('/userProfile');

    const saveChangesButtonOnClickHandler = () => {
        updateUser(user, displayError, displaySuccessMessage)
    }

    return(
        <MaxSizeContainer>
            <PageContainer>
                {
                    user
                    ?
                    <Fragment>
                        <h2>Profile Picture</h2>
                        <OnHoverEdit>
                            <RoundImageContainer size="page" serviceOrUser={'user'} picture={user.profilePicture}/>
                        </OnHoverEdit>
                        <h2>First Name</h2>
                        <input className="text-area" type="text" value={user.firstName} onChange={e => {setUser({...user, firstName: e.target.value})}}/>
                        <h2>Last Name</h2>
                        <input className="text-area" type="text" value={user.lastName} onChange={e => {setUser({...user, lastName: e.target.value})}}/>
                        <h2>Description</h2>
                        <textarea className="text-area" type="text" rows='10' defaultValue={user.profileDescription} onChange={e => {setUser({...user, profileDescription: e.target.value})}}/>
                        <h2>Services</h2>  
                        <ServicesList services={userServices}/>
                        <ButtonComponent buttonType={'confirm'} onClickHandler={editServicesButtonOnClickHandler}>Edit Your Services</ButtonComponent>
                        <ButtonComponent buttonType={'confirm'} onClickHandler={saveChangesButtonOnClickHandler}>Save Changes</ButtonComponent>
                        <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Cancel</ButtonComponent>
                    </Fragment>
                    :
                    <span>Something went wrong...</span>
                }
            </PageContainer>
        </MaxSizeContainer>
    )
}

export default EditUserProfile