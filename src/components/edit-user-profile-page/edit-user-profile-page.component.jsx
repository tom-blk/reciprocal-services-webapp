import { Fragment, useContext, useEffect, useState } from "react";

import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";
import ButtonComponent from "../button/button.component";
import ServicesList from "../services-list/services-list.component";
import { useNavigate } from "react-router";
import { updateUser } from "../../api/users/update";
import { OnHoverEdit } from "../on-hover-edit-component/on-hover-edit.component";
import { getFileUrl } from "../../utils/web3storage/web3storage";
import { ModalContext } from "../../context/modal.context";
import SelectProfilePictureModal from "../modal/select-profile-picture-modal.component";
import { apiCall } from "../../api/api-call";

const EditUserProfile = () => {

    const { user } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);

    const [tempUser, setTempUser] = useState(user);
    const [userServices, setUserServices] = useState([]);
    const [profilePicture, setProifilePicture] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        apiCall('/users/get-user-specific-services', 'POST', {userId: user.id}, displayError, undefined).then(response => setUserServices(response));
    }, [])

    useEffect(() => {
        if(user.profilePicture)
        getFileUrl(user.profilePicture, displayError).then(response => setProifilePicture(response));
    }, [user])

    const selectNewProfilePicture = () => {
        toggleModal(
            <SelectProfilePictureModal
                userId={user.id}
                profilePictureCid={user.profilePicture}
            />
        );
    }

    const editServicesButtonOnClickHandler = () => navigate(`/userProfile-edit/edit-services`);

    const cancelButtonOnClickHandler = () => navigate('/userProfile');

    const saveChangesButtonOnClickHandler = () => {
        updateUser(user, displayError, displaySuccessMessage)
    }

    return(
        <MaxSizeContainer>
            <PageContainer>
                    <Fragment>
                        <h2>Profile Picture</h2>
                        <OnHoverEdit onClickFunction={selectNewProfilePicture} size={'round-image-container-page'}>
                            <RoundImageContainer size={'round-image-container-page'} serviceOrUser={'user'} picture={profilePicture}/>
                        </OnHoverEdit>
                        <h2>First Name</h2>
                        <input className="text-area" type="text" value={user.firstName} onChange={e => {setTempUser({...user, firstName: e.target.value})}}/>
                        <h2>Last Name</h2>
                        <input className="text-area" type="text" value={user.lastName} onChange={e => {setTempUser({...user, lastName: e.target.value})}}/>
                        <h2>Description</h2>
                        <textarea className="text-area" type="text" rows='10' defaultValue={user.profileDescription} onChange={e => {setTempUser({...user, profileDescription: e.target.value})}}/>
                        <h2>Services</h2>  
                        <ServicesList services={userServices}/>
                        <ButtonComponent buttonType={'confirm'} onClickHandler={editServicesButtonOnClickHandler}>Edit Your Services</ButtonComponent>
                        <ButtonComponent buttonType={'confirm'} onClickHandler={saveChangesButtonOnClickHandler}>Save Changes</ButtonComponent>
                        <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Cancel</ButtonComponent>
                    </Fragment>
            </PageContainer>
        </MaxSizeContainer>
    )
}

export default EditUserProfile