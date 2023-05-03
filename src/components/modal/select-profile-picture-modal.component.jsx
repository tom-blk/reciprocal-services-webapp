import { useContext, Fragment, useState, useEffect } from "react";

import { ModalContext } from "../../context/modal.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import './orderServiceModal.styles.css';
import { uploadNewProfilePictureAndCreateDatabaseEntryWithCid } from "../../api/users/upload-new-profile-picture-and-create-database-entry-with-cid";
import ImageCropComponent from "../image-crop-component/image-crop-component";
import { deleteFile } from "../../utils/web3storage/web3storage";


const SelectProfilePictureModal = ({ userId, profilePictureCid }) => {

    const { toggleModal } = useContext(ModalContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const handleCroppedImage = async (croppedImage) => {
        uploadNewProfilePictureAndCreateDatabaseEntryWithCid(userId, croppedImage, displayError, displaySuccessMessage).then(
            deleteFile(profilePictureCid, displayError).then(
                toggleModal(),
                console.log('Old profile picture deleted.')
            )
        );
    }

    return(
        <Fragment>
            <h2>Select Your New Profile Picture</h2>
            <ImageCropComponent handleCroppedImage={handleCroppedImage} onCancel={toggleModal}/>
        </Fragment>
    )
}

export default SelectProfilePictureModal