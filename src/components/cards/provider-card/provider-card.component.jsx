import { useContext, useState } from "react";

import { ModalContext } from "../../../context/modal.context";

import ButtonComponent from "../../buttons/button.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";
import OrderServiceModal from "../../modals/orderService/orderServiceModal";
import CardComponent from "../card.component";
import RatingDisplayComponent from "../../rating/rating-display-component/rating-display.component";

import { useNavigate } from "react-router";
import { assertDisplayName } from "../../../helper-functions/users/assertDisplayName";

import './provider-card.styles.scss';

const ProviderCard = ({ user, serviceId, serviceName, isServiceRelated, embersPerHour }) => {
    const {id, firstName, lastName, rating, ratingCount} = user;

    const { toggleModal } = useContext(ModalContext);

    const navigate = useNavigate()

    const [serviceOrdered, setServiceOrdered] = useState(false);

    const openOrderServiceModal = (e) => {
        e.stopPropagation();
        toggleModal(
            <OrderServiceModal 
                providingUserId={id} 
                providingUserFirstName={firstName} 
                providingUserLastName={lastName} 
                serviceId={serviceId}
                serviceName={serviceName}
                serviceOrderedCallback={setServiceOrderedHandler}
                embersPerHour={embersPerHour}
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
        <CardComponent onClickHandler={onClickHandler}>
            <div className={`provider-card-main-container ${isServiceRelated ? 'provider-card-main-container-grid' : 'provider-card-main-container-flex'}`}>

                <div className="provider-card-left-data-container overflow-control">
                    <RoundImageContainer serviceOrUserId={id} serviceOrUser={'user'} size={'round-image-container-card'}/>
                    <div className="heading-secondary overflow-control">{assertDisplayName(user)}</div>  
                </div>

                {
                isServiceRelated
                &&
                <div className="provider-card-center-data-container">
                    <span className="bold">{embersPerHour} </span>
                    <span>Embers per Hour</span> 
                </div>
                }
                

                <div className="provider-card-right-data-container">
                    <div className="provider-card-rating-container">
                        <RatingDisplayComponent rating={rating}/>
                        <span className="sub-text">{`Rated ${ratingCount} times`}</span>
                    </div>
                    {
                    isServiceRelated
                    &&
                    <ButtonComponent
                        buttonType={serviceOrdered ? "inactive" : "confirm"}
                        onClickHandler={serviceOrdered ? undefined : e => openOrderServiceModal(e)}
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