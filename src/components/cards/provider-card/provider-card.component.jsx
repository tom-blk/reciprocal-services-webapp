import { useContext, useEffect, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ButtonComponent from "../../buttons/button.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import OrderServiceModal from "../../modals/orderService/orderServiceModal";
import CardComponent from "../card.component";
import RatingDisplayComponent from "../../rating/rating-display-component/rating-display.component";

import { useNavigate } from "react-router";
import { assertDisplayName } from "../../../helper-functions/users/assertDisplayName";

import { getFileUrl } from "../../../utils/web3storage/web3storage";

import './provider-card.styles.scss';


const ProviderCard = ({ user, serviceId, serviceName, orderButtonExists }) => {
    const {id, firstName, lastName, profilePicture, rating} = user;

    const { toggleModal } = useContext(ModalContext);
    const { displayError } = useContext(AlertMessageContext);

    const navigate = useNavigate()

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState(false);

    useEffect(() => {
        if(profilePicture)
        getFileUrl(profilePicture, displayError)
            .then(response => setProfilePictureUrl(response))
            .catch(error => displayError(error))
    }, [])

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(
            <OrderServiceModal 
                providingUserId={id} 
                providingUserFirstName={firstName} 
                providingUserLastName={lastName} 
                serviceId={serviceId}
                serviceName={serviceName}
                serviceOrderedCallback={setServiceOrderedHandler}
            />
        );
    }

    const setServiceOrderedHandler = () => {
        setServiceOrdered(true);
    }

    const onClickHandler = () => {
        navigate(`/providers/${id}`)
    }

    return(
        <CardComponent onClickHandler={onClickHandler} className="card">
            <div className="provider-card-main-data-container">
                <div className="provider-card-left-data-container">
                    <RoundImageContainer picture={profilePictureUrl} serviceOrUser={'user'} size={'round-image-container-card'}/>
                    <div className="heading-secondary">{assertDisplayName(user)}</div>  
                </div>
                <div className="provider-card-right-data-container">
                    <RatingDisplayComponent rating={rating}/>
                    {
                        orderButtonExists
                        &&
                        <ButtonComponent
                            buttonType={serviceOrdered ? "inactive" : "confirm"}
                            onClickHandler={serviceOrdered ? undefined : e => openModal(e)}
                        >
                            {serviceOrdered ? "Service Ordered!" : "Order Service"}
                        </ButtonComponent>
                    }
                </div>
            </div>
        </CardComponent>
    )
}

export default ProviderCard