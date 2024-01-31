import React, { Fragment, useContext, useEffect, useState } from "react";
import { Country } from "../../types/general";
import { MaybeUserSpecificService } from "../../types/services";

import { UserContext } from "../../context/user.context";
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
import { toast } from "react-toastify";
import AlertMessageComponent from "../../components/alerts/alert-message.component";
import { errorMessageOptions, successMessageOptions } from "../../components/alerts/alertMessageTypes";


const EditUserProfile = () => {

    const { user, fetchUser } = useContext(UserContext);
    const { id, firstName, lastName, profileDescription, profilePicture, postCode, city, travellingForOrders } = user!

    const { toggleModal } = useContext(ModalContext);

    const [tempUser, setTempUser] = useState(user!);
    const [userServices, setUserServices] = useState<MaybeUserSpecificService[]>([]);
    const [countries, setCountries] = useState<Country[] | undefined>(undefined);
    const [defaultCountryName, setDefaultCountryName] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        getUserSpecificServices(user!.id)
            .then(response => setUserServices(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
    }, [user])

    useEffect(() => {
        getAllCountries()
            .then(response => setCountries(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
    }, [])

    useEffect(() => {
        if(countries && user!.country)
        setDefaultCountryName(countries.filter((country) => {return country.id === user!.country})[0].name)
    }, [countries, user])

    const selectNewProfilePicture = () => {
        toggleModal(
            <SelectProfilePictureModal
                userId={id}
                setUpdatedProfilePictureCallback={fetchUser}
            />
        );
    }

    const editServicesButtonOnClickHandler = () => navigate(`/userProfile-edit/edit-services`);

    const cancelButtonOnClickHandler = () => navigate('/userProfile');

    const saveChangesButtonOnClickHandler = () => {
        updateUser(tempUser)
            .then(() => {
                fetchUser();
                toast(<AlertMessageComponent successMessage='Profile successfully updated!'/>, successMessageOptions)
                navigate('/userProfile');
            })
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
    }

    const convertStringToNumber = (input: string) => {
        if(input === ""){
            setTempUser({...tempUser, postCode: undefined}) 
        }else if(!isNaN(Number(input))){
            setTempUser({...tempUser, postCode: Number(input)}) 
        } else {
            setTempUser({...tempUser, postCode: undefined}) 
        }
    }

    return(
        <PageContainer>
            <h2>Profile Picture</h2>
            <OnHoverEdit onClickFunction={selectNewProfilePicture} size={'round-image-container-page'}>
                <RoundImageContainer pictureIsPresent={profilePicture}  serviceOrUserId={id} size={'round-image-container-page'} serviceOrUser={'user'}/>
            </OnHoverEdit>
            <LimitedTextInput inputLabel={'First Name'} defaultValue={firstName} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {setTempUser({...tempUser, firstName: input})}}/>
            <LimitedTextInput inputLabel={'Last Name'} defaultValue={lastName} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {setTempUser({...tempUser, lastName: input})}}/>
            <div className="location-definition-div">
            {
                countries&&
                <Fragment>
                    <DropdownMenu defaultCountry={defaultCountryName} content={countries} onSelect={(input) => setTempUser({...tempUser, country: input})}/>
                    <LimitedTextInput inputLabel={'ZIP Code'} defaultValue={postCode?.toString()} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {convertStringToNumber(input)}}/>
                    <LimitedTextInput inputLabel={'City'} defaultValue={city} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={(input) => {setTempUser({...tempUser, city: input})}}/>
                </Fragment>
            }
            </div> 
            <div className="travelling-for-orders-div">
                <h3>Travelling For Orders</h3>
                <input type="checkbox" className="checkbox" defaultChecked={travellingForOrders} onChange={e => {setTempUser({...tempUser, travellingForOrders: !tempUser.travellingForOrders})}}/>
            </div>
            <LimitedTextInput inputLabel={'Description'} defaultValue={profileDescription} numberOfTextRows={5} numberOfCharacters={255} onChangeHandler={(input) => {setTempUser({...tempUser, profileDescription: input})}}/>
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