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
import LimitedTextInput from "../../components/limited-text-input/limited-text-input.component";

import { useNavigate } from "react-router";

import { updateUser } from "../../api/users/update";
import { getUserSpecificServices } from "../../api/users/read";
import { getAllCountries } from "../../api/countries/read";

import './edit-user-profile.styles.scss';

const EditUserProfile = () => {

    const { user, fetchUser } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);

    const [tempUser, setTempUser] = useState(user);
    const [userServices, setUserServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUserSpecificServices(user.id)
            .then(response => setUserServices(response))
            .catch(error => displayError(error));
    }, [])

    const selectNewProfilePicture = () => {
        toggleModal(
            <SelectProfilePictureModal
                userId={user.id}
                setUpdatedProfilePictureCallback={fetchUser}
            />
        );
    }

    useEffect(() => {
        if(userServices)
        console.log(userServices)
    }, [userServices])

    const editServicesButtonOnClickHandler = () => navigate(`/userProfile-edit/edit-services`);

    const cancelButtonOnClickHandler = () => navigate('/userProfile');

    const saveChangesButtonOnClickHandler = () => {
        if(tempUser.firstName === false || tempUser.lastName === false || tempUser.city === false || tempUser.postCode === false || tempUser.profileDescription === false){
            displayError(new Error('Please update all your information correctly.'))
        }else{
            updateUser(tempUser)
            .then(() => {
                fetchUser();
                displaySuccessMessage('Profile successfully updated!');
                navigate('/userProfile');
            })
            .catch(error => displayError(error))
        }
        
    }

    return(
        <PageContainer>
            <h2>Profile Picture</h2>
            <OnHoverEdit onClickFunction={selectNewProfilePicture} size={'round-image-container-page'}>
                <RoundImageContainer key={user.profilePicture} pictureIsPresent={user.profilePicture}  serviceOrUserId={user.id} size={'round-image-container-page'} serviceOrUser={'user'}/>
            </OnHoverEdit>
            <LimitedTextInput inputLabel={'First Name'} defaultValue={user.firstName} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {setTempUser({...tempUser, firstName: input})}}/>
            <LimitedTextInput inputLabel={'Last Name'} defaultValue={user.lastName} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {setTempUser({...tempUser, lastName: input})}}/>
            <div className="location-definition-div">
                <DropdownMenu defaultCountry={user.country} getListContent={getAllCountries} onSelect={(input) => setTempUser({...tempUser, country: input})}/>
                <LimitedTextInput inputLabel={'ZIP Code'} defaultValue={user.postCode} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {setTempUser({...tempUser, postCode: input})}}/>
                <LimitedTextInput inputLabel={'City'} defaultValue={user.city} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {setTempUser({...tempUser, city: input})}}/>
            </div> 
            <div className="travelling-for-orders-div">
                <h3>Travelling For Orders</h3>
                <input type="checkbox" className="checkbox" defaultChecked={user.travellingForOrders} onChange={e => {setTempUser({...tempUser, travellingForOrders: !tempUser.travellingForOrders})}}/>
            </div>
            <LimitedTextInput inputLabel={'Description'} defaultValue={user.profileDescription} numberOfTextRows={5} numberOfCharacters={255} onChangeHandler={(input) => {setTempUser({...tempUser, profileDescription: input})}}/>
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