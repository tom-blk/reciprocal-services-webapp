import { useContext, Fragment, useState, useEffect } from "react";

import { ModalContext } from "../../../context/modal.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ImageCropComponent from "../../image-crop/image-crop-component";
import ButtonComponent from "../../buttons/button.component";

import { uploadUserOrServicePicture } from "../../../api/storage/upload-profile-picture";

const SelectProfilePictureModal = ({ userId, setUpdatedProfilePictureCallback }) => {

    const { toggleModal } = useContext(ModalContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    
    const [croppedImage, setCroppedImage] = useState(undefined);

    useEffect(() => {
        console.log(croppedImage)
    }, [croppedImage])

    console.log("Modal toggled")

    const handleCroppedImage = async () => {
        if(!croppedImage){
            displayError(new Error('Please Crop Your Image First!'))
        }else{
            uploadUserOrServicePicture(croppedImage, userId, 'user')
                .then(response => {
                    displaySuccessMessage(response);
                    setUpdatedProfilePictureCallback();
                    toggleModal();
                })
                .catch(error => displayError(error))
        }
    }


    return(
        <Fragment>
            <h2>Select Your New Profile Picture</h2>
            <ImageCropComponent handleCroppedImage={setCroppedImage}/>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={handleCroppedImage}>Confirm</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default SelectProfilePictureModal