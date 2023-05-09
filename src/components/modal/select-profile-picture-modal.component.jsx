import { useContext, Fragment, useState, useEffect } from "react";

import { ModalContext } from "../../context/modal.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import './orderServiceModal.styles.css';
import { uploadNewProfilePictureAndCreateDatabaseEntryWithCid } from "../../api/users/upload-new-profile-picture-and-create-database-entry-with-cid";
import ImageCropComponent from "../image-crop-component/image-crop-component";
import ButtonComponent from "../button/button.component";


const SelectProfilePictureModal = ({ userId, profilePictureCid }) => {

    const { toggleModal } = useContext(ModalContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    
    const [croppedImage, setCroppedImage] = useState(undefined);

    const handleCroppedImage = async () => {
        uploadNewProfilePictureAndCreateDatabaseEntryWithCid(userId, croppedImage, displayError, displaySuccessMessage).then(() => {
            toggleModal();
        })
    }

    useEffect(() => {
        console.log(croppedImage);
    }, [croppedImage])

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