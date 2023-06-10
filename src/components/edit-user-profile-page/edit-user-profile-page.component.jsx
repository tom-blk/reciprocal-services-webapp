import { Fragment, useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import { ModalContext } from "../../context/modal.context";

import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";
import ButtonComponent from "../button/button.component";
import ServicesList from "../services-list/services-list.component";
import SelectProfilePictureModal from "../modal/select-profile-picture-modal.component";
import OnHoverEdit from "../on-hover-edit-component/on-hover-edit.component";

import { useNavigate } from "react-router";

import { updateUser } from "../../api/users/update";
import { getUserSpecificServices } from "../../api/users/read";
import { getFileUrl } from "../../utils/web3storage/web3storage";

const EditUserProfile = () => {

    const { user } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);

    const [tempUser, setTempUser] = useState(user);
    const [userServices, setUserServices] = useState([]);
    const [profilePicture, setProfilePicture] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        getUserSpecificServices(user.id)
            .then(response => setUserServices(response))
            .catch(error => displayError(error));
    }, [])

    useEffect(() => {
        if(user.profilePicture)
        getFileUrl(user.profilePicture, displayError)
            .then(response => setProfilePicture(response));
    }, [user])

    useEffect(() => {
        console.log(tempUser);
    }, [tempUser])

    const selectNewProfilePicture = () => {
        toggleModal(
            <SelectProfilePictureModal
                userId={user.id}
                setUpdatedProfilePictureCallback={setUpdatedProfilePicture}
            />
        );
    }

    const setUpdatedProfilePicture = (newProfilePicture) => {
        setProfilePicture(URL.createObjectURL(newProfilePicture))
    }

    const editServicesButtonOnClickHandler = () => navigate(`/userProfile-edit/edit-services`);

    const cancelButtonOnClickHandler = () => navigate('/userProfile');

    const saveChangesButtonOnClickHandler = () => {
        updateUser(tempUser)
            .then(displaySuccessMessage('Profile successfully updated!'))
            .catch(error => displayError(error))
    }

    return(
        <PageContainer>
            <Fragment>
                <h2>Profile Picture</h2>
                <OnHoverEdit onClickFunction={selectNewProfilePicture} size={'round-image-container-page'}>
                    <RoundImageContainer size={'round-image-container-page'} serviceOrUser={'user'} picture={profilePicture}/>
                </OnHoverEdit>
                <h2>First Name</h2>
                <input className="text-area" type="text" defaultValue={user.firstName} onChange={e => {setTempUser({...user, firstName: e.target.value})}}/>
                <h2>Last Name</h2>
                <input className="text-area" type="text" defaultValue={user.lastName} onChange={e => {setTempUser({...user, lastName: e.target.value})}}/>
                <h2>Description</h2>
                <textarea className="text-area" type="text" rows='10' defaultValue={user.profileDescription} onChange={e => {setTempUser({...user, profileDescription: e.target.value})}}/>
                <h2>Services</h2>  
                <ServicesList services={userServices}/>
                <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={editServicesButtonOnClickHandler}>Edit Your Services</ButtonComponent>
                <ButtonComponent buttonType={'confirm'} onClickHandler={saveChangesButtonOnClickHandler}>Save Changes</ButtonComponent>
                <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Cancel</ButtonComponent>
            </Fragment>
        </PageContainer>
    )
}

export default EditUserProfile