import { useContext, Fragment, useEffect, useState } from "react";

import { ModalContext } from "../../context/modal.context";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import ButtonComponent from "../button/button.component";

import { createService } from "../../api/services/create-service";

import './orderServiceModal.styles.css';
import { addServiceToUserServices } from "../../api/users/add-service-to-user-services";
import RoundImageContainer from "../round-image-container/round-image-container.component";
import ImageCropComponent from "../image-crop-component/image-crop-component";



const AddServiceModal = () => {

    const { toggleModal } = useContext(ModalContext);
    const { testUser } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const serviceDataTemplate = {
        name:'',
        description:'',
        icon: undefined
    }

    const [addToUserServices, setAddToUserServices] = useState(false);
    const [serviceData, setServiceData] = useState(serviceDataTemplate);
    const [displayCropper, setDisplayCropper] = useState(false);

    useEffect(() => {
        console.log(serviceData)
    }, [serviceData])

    const onClickHandler = () => {
        createService(serviceData, displaySuccessMessage, displayError).then(response => {
            if(addToUserServices){
                addServiceToUserServices(testUser.id, response.insertId, displayError, displaySuccessMessage);
            }
        });
        
        toggleModal();
    }

    const onServiceDataChangeHandler = (e, name) => {
        setServiceData({ ...serviceData, [name]: e.target.value })
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
            <span style={{fontSize: 'var(--font-small'}}>
                Hint: This Application is primarily user managed. To maintain the integrity of the database it is highly advised to check if the service you are about to create or similar services already exist.
            </span>
            <span>Name</span>
            <input className="text-area" type="text" onChange={e => onServiceDataChangeHandler(e, 'name')}/>
            <span>Icon</span>
            <div style={{display: 'flex', gap: 'var(--space-4)', alignItems: 'center', justifyItems: 'center'}} >
                <RoundImageContainer picture={undefined} serviceOrUser={'service'} size={'round-image-container-card'}/>
                <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={displayCropperHandler}>Change</ButtonComponent>
            </div>
            {
                displayCropper &&
                <ImageCropComponent optionalWidth={'150px'} handleCroppedImage={croppedImageHandler} onCancel={() => {return}}/>
            }
            <span>Description</span>
            <textarea className="text-area" onChange={e => onServiceDataChangeHandler(e, 'description')} style={{width:'70%'}} type='text' rows='10'></textarea>
            <div style={{display: 'flex', gap: 'var(--space-3'}}>
                <span>Add this to your services after creation?</span>
                <input type="checkbox" onChange={e => setAddToUserServices(!addToUserServices)}/>
            </div>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default AddServiceModal