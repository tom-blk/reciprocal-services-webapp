import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import { ModalContext } from "../../context/modal.context";

import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";
import ButtonComponent from "../../components/buttons/button.component";
import ServicesList from "../../components/card-lists/services-list/services-list.component";
import SelectProfilePictureModal from "../../components/modals/selectProfilePicture/select-profile-picture-modal.component";
import OnHoverEdit from "../../components/on-hover-edit/on-hover-edit.component";
import Distancer from "../../utils/distancer/distancer.component";
import DropdownMenu from "../../components/dropdown-menu/dropdown-menu.component";

import { useNavigate } from "react-router";

import { updateUser } from "../../api/users/update";
import { getUserSpecificServices } from "../../api/users/read";
import { getAllCountries } from "../../api/countries/read";
import { getFileUrl } from "../../utils/web3storage/web3storage";

import './edit-user-profile.styles.scss';


const EditUserProfile = () => {

    const { user, fetchUser } = useContext(UserContext);
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

    const setUserCountry = (countryId) => {
        setTempUser({...tempUser, country: countryId});
    }

    const editServicesButtonOnClickHandler = () => navigate(`/userProfile-edit/edit-services`);

    const cancelButtonOnClickHandler = () => navigate('/userProfile');

    const saveChangesButtonOnClickHandler = () => {
        updateUser(tempUser)
            .then(() => {
                fetchUser();
                displaySuccessMessage('Profile successfully updated!');
                navigate('/userProfile');
            })
            .catch(error => displayError(error))
    }

    return(
        <PageContainer>
            <h2>Profile Picture</h2>
            <OnHoverEdit onClickFunction={selectNewProfilePicture} size={'round-image-container-page'}>
                <RoundImageContainer size={'round-image-container-page'} serviceOrUser={'user'} picture={profilePicture}/>
            </OnHoverEdit>
            <h2>First Name</h2>
            <input className="text-area" type="text" defaultValue={user.firstName} onChange={e => {setTempUser({...tempUser, firstName: e.target.value})}}/>
            <h2>Last Name</h2>
            <input className="text-area" type="text" defaultValue={user.lastName} onChange={e => {setTempUser({...tempUser, lastName: e.target.value})}}/>
            <h2>Location</h2>
            <div className="location-definition-div">
                <DropdownMenu defaultCountry={user.country} getListContent={getAllCountries} onSelect={setUserCountry}/>
                <input className="text-area" placeholder="Postal Code" type="text" defaultValue={user.postCode} onChange={e => {setTempUser({...tempUser, postCode: e.target.value})}}/>
                <input className="text-area" placeholder="City" type="text" defaultValue={user.city} onChange={e => {setTempUser({...tempUser, city: e.target.value})}}/>
            </div>
            <h2>Travelling For Orders</h2>
            <div className="edit-user-checkbox">
                <input type="checkbox" defaultChecked={user.travellingForOrders} onChange={e => {setTempUser({...tempUser, travellingForOrders: !tempUser.travellingForOrders})}}/>
            </div>
            <h2>Description</h2>
            <textarea className="text-area" type="text" rows='10' defaultValue={user.profileDescription} onChange={e => {setTempUser({...tempUser, profileDescription: e.target.value})}}/>
            <h2>Services</h2>  
            <ServicesList services={userServices}/>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={editServicesButtonOnClickHandler}>Edit Your Services</ButtonComponent>
            <Distancer size={1}/>
            <ButtonComponent buttonType={'confirm'} onClickHandler={saveChangesButtonOnClickHandler}>Save Changes</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Cancel</ButtonComponent>
        </PageContainer>
    )
}

export default EditUserProfile