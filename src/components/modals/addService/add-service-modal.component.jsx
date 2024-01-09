import { useContext, Fragment, useState, useEffect } from "react";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ButtonComponent from "../../buttons/button.component";
import ImageCropComponent from "../../image-crop/image-crop-component";
import LimitedTextInput from "../../limited-text-input/limited-text-input.component";

import { createService } from "../../../api/storage/create-service.js";

const AddServiceModal = () => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const serviceDataTemplate = {
        name:'',
        description:'',
        picture: undefined,
        userId: undefined,
        creditsPerHour: undefined
    }

    const [addToUserServices, setAddToUserServices] = useState(false);
    const [serviceData, setServiceData] = useState(serviceDataTemplate);
    const [displayCropper, setDisplayCropper] = useState(false);

    useEffect(() => {
        console.log(serviceData)
    }, [serviceData])

    useEffect(() => {
        if(addToUserServices){
            setServiceData({ ...serviceData, userId: user.id })
        } else {
            setServiceData({ ...serviceData, userId: undefined, creditsPerHour: undefined})
        }
    }, [addToUserServices])

    const onCreateServiceHandler = () => {
        if(serviceData.name && serviceData.name.length > 0 && serviceData.description && serviceData.description.length > 0){
            if(serviceData.userId !== undefined && serviceData.creditsPerHour === undefined){
                displayError(new Error('Please specify the amount of embers per hour you would like to receive for providing the service.'))
            } else {
                createService(serviceData, displaySuccessMessage, displayError)
                .then(response => {
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

    const onServiceUserCredisPerHourChangeHandler = (credits) => {
        setServiceData({ ...serviceData, creditsPerHour: credits })
        if(credits===''){
            setServiceData({ ...serviceData, creditsPerHour: undefined })
        }
    }

    const croppedImageHandler = (croppedImage) => {
        setServiceData({...serviceData, picture: croppedImage});
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
                <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={displayCropperHandler}>Select Service Image</ButtonComponent>
            </div>
            {
                displayCropper &&
                <ImageCropComponent optionalWidth={'150px'} handleCroppedImage={croppedImageHandler} onCancel={() => {return}}/>
            }
            <LimitedTextInput name='name' inputLabel={'Name'} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={onServiceNameChangeHandler}/>
            <LimitedTextInput name='description' inputLabel={'Description'} numberOfTextRows={5} numberOfCharacters={255} onChangeHandler={onServiceDescriptionChangeHandler}/>
            <div style={{display: 'flex', gap: 'var(--space-3'}}>
                <span>Add this to your services after creation?</span>
                <input type="checkbox" onChange={e => setAddToUserServices(!addToUserServices)}/>
                { addToUserServices && <input type="text" placeholder="Credits Per Hour" onChange={e => onServiceUserCredisPerHourChangeHandler(e.target.value)}/>}
            </div>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onCreateServiceHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default AddServiceModal