import { useContext, Fragment, useState, useEffect } from "react";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ButtonComponent from "../../buttons/button.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import ImageCropComponent from "../../image-crop/image-crop-component";
import LimitedTextInput from "../../limited-text-input/limited-text-input.component";

import { createService, createServiceAndAddToUserServices } from "../../../api/services/create";

const AddServiceModal = () => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const serviceDataTemplate = {
        name:'',
        description:'',
        icon: undefined
    }

    const [addToUserServices, setAddToUserServices] = useState(false);
    const [serviceData, setServiceData] = useState(serviceDataTemplate);
    const [displayCropper, setDisplayCropper] = useState(false);
    const [creditsPerHour, setCreditsPerHour] = useState(undefined);

    useEffect(() => {
        console.log(creditsPerHour)
    }, [creditsPerHour])

    const onCreateServiceHandler = () => {
        if(serviceData.name && serviceData.name.length > 0 && serviceData.description && serviceData.description.length > 0){
            if(!addToUserServices){
                createService(serviceData, displaySuccessMessage, displayError)
                    .then(response => {
                        displaySuccessMessage(response.successMessage);
                        toggleModal();
                    })
                    .catch(error => displayError(error))
            }else{
                createServiceAndAddToUserServices(serviceData, user.id, creditsPerHour, displaySuccessMessage, displayError)
                    .then(response => {
                        console.log(response)
                        displaySuccessMessage(response.successMessage);
                        toggleModal();
                    })
                    .catch(error => displayError(error))
            }
        } else {
            displayError(new Error('Please add service details and make sure that they do not exceed the maximum length.'))
        }
        
        

    }

    const onServiceNameChangeHandler = (name) => {
        setServiceData({ ...serviceData, name: name })
    }

    const onServiceDescriptionChangeHandler = (description) => {
        setServiceData({ ...serviceData, description: description })
    }

    const croppedImageHandler = (croppedImage) => {
        setServiceData({...serviceData, icon: croppedImage});
    }
     
    const displayCropperHandler = () => {
        setDisplayCropper(!displayCropper);
    }



    return(
        <Fragment>
            <h2>Add a New Service</h2>
            <span style={{fontSize: 'var(--font-small)'}}>
                Hint: This Application is primarily user managed. To maintain the integrity of the database it is highly advised to check if the service you are about to create or similar services already exist.
            </span>
            <div style={{display: 'flex', gap: 'var(--space-4)', alignItems: 'center', justifyItems: 'center'}} >
                <RoundImageContainer picture={undefined} serviceOrUser={'service'} size={'round-image-container-card'}/>
                <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={displayCropperHandler}>Change</ButtonComponent>
            </div>
            {
                displayCropper &&
                <ImageCropComponent optionalWidth={'150px'} handleCroppedImage={croppedImageHandler} onCancel={() => {return}}/>
            }
            <LimitedTextInput inputLabel={'Name'} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={onServiceNameChangeHandler}/>
            <LimitedTextInput inputLabel={'Description'} numberOfTextRows={5} numberOfCharacters={255} onChangeHandler={onServiceDescriptionChangeHandler}/>
            <div style={{display: 'flex', gap: 'var(--space-3'}}>
                <span>Add this to your services after creation?</span>
                <input type="checkbox" onChange={e => setAddToUserServices(!addToUserServices)}/>
                { addToUserServices && <input type="text" placeholder="Credits Per Hour" onChange={e => {setCreditsPerHour(e.target.value)}}/>}
            </div>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onCreateServiceHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default AddServiceModal