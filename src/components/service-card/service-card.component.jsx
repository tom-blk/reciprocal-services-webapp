import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModalContext } from "../../context/modal.context";
import ButtonComponent from "../button/button.component";
import CardDataContainer from "../card-data-container/card-data-container.component";
import CardComponent from "../card/card.component";
import OrderServiceModal from "../modal/orderServiceModal";
import RoundImageContainer from "../round-image-container/round-image-container.component";

import './service-card.styles.scss';
import { LoadingComponentBars, LoadingComponentCirlce } from "../loading/loading.components";
import RatingDisplayComponent from "../rating-display-component/rating-display.component";

const ServiceCard = ({ service, providingUserId, providingUserFirstName, providingUserLastName, orderButtonExists }) => {
    const { id, icon, name, description } = service;

    const { toggleModal } = useContext(ModalContext);

    const navigate = useNavigate();

    const [serviceOrdered, setServiceOrdered] = useState(false);

    const onClickHandler = () => navigate(`/services/${id}`)

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(
            <OrderServiceModal
                providingUserId={providingUserId} 
                providingUserFirstName={providingUserFirstName}
                providingUserLastName={providingUserLastName}
                serviceId={id} 
                serviceName={name} 
                serviceOrderedCallback={setServiceOrderedHandler}
            />
        );
    }

    const setServiceOrderedHandler = () => {
        setServiceOrdered(true);
    }

    return(
        <CardComponent onClickHandler={onClickHandler} className="card service-card">
            <div className="service-card-main-data-container">
                <div className="service-card-left-data-container">
                    <RoundImageContainer picture={icon} serviceOrUser={'service'} size={'card'}/>
                    <div>
                        <div className="heading-secondary">{name}</div>
                        <div className="text">{description}</div>
                    </div>
                </div>
                { !orderButtonExists && <div className="heading-secondary">? Providers</div> }
                {
                    orderButtonExists 
                    &&
                    <ButtonComponent 
                        buttonType={serviceOrdered ? 'inactive' : 'confirm'}
                        onClickHandler={openModal}
                    >
                        {serviceOrdered ? 'Service Ordered!' : 'Order Service'}
                    </ButtonComponent>
                }
            </div>
            
        </CardComponent>
    )
}

export default ServiceCard