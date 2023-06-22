import { useContext, Fragment, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ImageCropComponent from "../../image-crop/image-crop-component";
import ButtonComponent from "../../buttons/button.component";

import { uploadNewProfilePictureAndCreateDatabaseEntryWithCid } from "../../../api/users/update";

const SelectProfilePictureModal = ({ userId, setUpdatedProfilePictureCallback }) => {

    const { toggleModal } = useContext(ModalContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    
    const [croppedImage, setCroppedImage] = useState(undefined);

    const handleCroppedImage = async () => {
        uploadNewProfilePictureAndCreateDatabaseEntryWithCid(userId, croppedImage, displayError, displaySuccessMessage)
            .then(() => {
                setUpdatedProfilePictureCallback(croppedImage)
                toggleModal()
            })
            .catch(error => displayError(error))
    }

    return(
        <Fragment>
            <h2>Select Your New Profile Picture</h2>
            <ImageCropComponent optionalWidth={'500px'} handleCroppedImage={setCroppedImage}/>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={handleCroppedImage}>Confirm</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default SelectProfilePictureModal