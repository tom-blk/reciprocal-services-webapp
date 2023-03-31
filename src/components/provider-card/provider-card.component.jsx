import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { ModalContext } from "../../context/modal.context";

import ButtonComponent from "../button/button.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";
import CardDataContainer from "../card-data-container/card-data-container.component";
import OrderServiceModal from "../modal/orderServiceModal";
import CardComponent from "../card/card.component";
import RatingDisplayComponent from "../rating-display-component/rating-display.component";

import './provider-card.styles.scss';

const ProviderCard = ({ user, serviceId, serviceName, orderButtonExists }) => {

    const { toggleModal } = useContext(ModalContext);

    const {id, firstName, lastName, profilePicture, rating} = user;

    const navigate = useNavigate()

    const [serviceOrdered, setServiceOrdered] = useState(false);

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
                    <RoundImageContainer picture={profilePicture} serviceOrUser={'user'} size={'card'}/>
                    <div className="heading-secondary">{firstName + ' ' + lastName}</div>  
                    <RatingDisplayComponent rating={rating}/>
                </div>
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
        </CardComponent>
    )
}

export default ProviderCard