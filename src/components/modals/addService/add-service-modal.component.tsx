import { useContext, Fragment, useState, useEffect } from "react";
import { ServiceData } from "../../../types/services";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";

import ButtonComponent from "../../buttons/button.component";
import ImageCropComponent from "../../image-crop/image-crop-component";
import LimitedTextInput from "../../limited-text-input/limited-text-input.component";

import { createService } from "../../../api/services/create";
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions, successMessageOptions } from "../../alerts/alertMessageTypes";

const AddServiceModal = ({onServiceCreatedCallback}: {onServiceCreatedCallback: () => void}) => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const { id } = user!; 

    const serviceDataTemplate = {
        name:'',
        description:'',
        picture: undefined,
        userId: undefined,
        creditsPerHour: undefined,
    }

    const [addToUserServices, setAddToUserServices] = useState<boolean>(false);
    const [serviceData, setServiceData] = useState<ServiceData>(serviceDataTemplate);
    const [displayCropper, setDisplayCropper] = useState<boolean>(false);

    useEffect(() => {
        if(addToUserServices){
            setServiceData(s  => ({ ...s, userId: id }))
        } else {
            setServiceData(s => ({ ...s, userId: undefined, creditsPerHour: undefined}))
        }
    }, [addToUserServices, id])

    const onCreateServiceHandler = () => {
        if(serviceData.name && serviceData.name.length > 0 && serviceData.description && serviceData.description.length > 0){
            if(serviceData.userId !== undefined && serviceData.creditsPerHour === undefined){
                toast(<AlertMessageComponent errorMessage={'Please specify the amount of embers per hour you would like to receive for providing the service.'}/>, errorMessageOptions )
            } else if(isNaN(Number(serviceData.creditsPerHour))){
                toast(<AlertMessageComponent errorMessage={'Please input a valid number of credits.'}/>, errorMessageOptions )
            }else{
                createService(serviceData)
                    .then(response => {
                        toast(<AlertMessageComponent successMessage={response.successMessage}/>, successMessageOptions );
                        onServiceCreatedCallback();
                        toggleModal();
                    })
                    .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions )})
            }
        } else {
            toast(<AlertMessageComponent errorMessage={'Please add service details and make sure that they do not exceed the maximum length.'}/>, errorMessageOptions )
        }
    }

    const onServiceNameChangeHandler = (name: string) => {
        setServiceData({ ...serviceData, name: name })
    }

    const onServiceDescriptionChangeHandler = (description: string) => {
        setServiceData({ ...serviceData, description: description })
    }

    const onServiceUserCredisPerHourChangeHandler = (credits: string) => {
        setServiceData({ ...serviceData, creditsPerHour: Number(credits) })
        if(credits===''){
            setServiceData({ ...serviceData, creditsPerHour: undefined })
        }
    }

    const croppedImageHandler = (croppedImage:File) => {
        setServiceData({...serviceData, picture: croppedImage});    
    }
     
    const displayCropperHandler = () => {
        setDisplayCropper(!displayCropper);
    }

    const onCancel = (e: React.MouseEvent<HTMLElement>) => {
        toggleModal()
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
                <ImageCropComponent optionalWidth={'150px'} handleCroppedImage={croppedImageHandler}/>
            }
            <LimitedTextInput defaultValue='' inputLabel={'Name'} numberOfTextRows={1} numberOfCharacters={45} onChangeHandler={onServiceNameChangeHandler}/>
            <LimitedTextInput defaultValue='' inputLabel={'Description'} numberOfTextRows={5} numberOfCharacters={255} onChangeHandler={onServiceDescriptionChangeHandler}/>
            <div style={{display: 'flex', gap: 'var(--space-3'}}>
                <span>Add this to your services after creation?</span>
                <input type="checkbox" onChange={e => setAddToUserServices(!addToUserServices)}/>
                { addToUserServices && <input type="text" placeholder="Credits Per Hour" onChange={e => onServiceUserCredisPerHourChangeHandler(e.target.value)}/>}
            </div>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onCreateServiceHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={onCancel}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default AddServiceModal