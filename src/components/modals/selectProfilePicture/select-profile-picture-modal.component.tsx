import { useContext, Fragment, useState } from "react";

import { ModalContext } from "../../../context/modal.context";

import ImageCropComponent from "../../image-crop/image-crop-component";
import ButtonComponent from "../../buttons/button.component";

import { uploadProfilePicture } from "../../../api/users/update";
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions, successMessageOptions } from "../../alerts/alertMessageTypes";
import { UserContext } from "../../../context/user.context";

interface Props{
    userId: number;
    setUpdatedProfilePictureCallback: () => void;
}

const SelectProfilePictureModal = ({ userId, setUpdatedProfilePictureCallback }: Props) => {

    const { toggleModal } = useContext(ModalContext);
    const { fetchUser } = useContext(UserContext);
    
    const [croppedImage, setCroppedImage] = useState<File | undefined>(undefined);

    const handleCroppedImage = async () => {
        if(!croppedImage){
            toast(<AlertMessageComponent errorMessage='Please Crop Your Image First!'/>, errorMessageOptions);
        }else{
            uploadProfilePicture(croppedImage, userId)
                .then(response => {
                    fetchUser();
                    toast(<AlertMessageComponent successMessage={response}/>, successMessageOptions);
                    setUpdatedProfilePictureCallback();
                    toggleModal();
                })
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        }
    }

    const toggleOnClick = () => {
        toggleModal()
    }

    return(
        <Fragment>
            <h2>Select Your New Profile Picture</h2>
            <ImageCropComponent handleCroppedImage={setCroppedImage}/>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={handleCroppedImage}>Confirm</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleOnClick}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default SelectProfilePictureModal