import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ModalContext } from "../../context/modal.context";
import ButtonComponent from "../button/button.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";

const ProviderCard = ({ user, orderButtonExists }) => {

    const { toggleModal } = useContext(ModalContext);

    const {id, firstName, lastName, profilePicture} = user;

    const navigate = useNavigate()

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const orderServiceAndCloseModal = (e) => {
        e.stopPropagation();
        setServiceOrdered(true);
        setModalIsOpen(false);
    }

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(<OrderServiceModal firstName={firstName} lastName={lastName}/>);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false);
    }

    return(
        <div onClick={e => navigate(`/providers/${id}`)} className="card">
            <RoundImageContainer picture={profilePicture} serviceOrUser={'user'} size={'card'}/>
            <div className="heading-secondary">{firstName + ' ' + lastName}</div>
            {
                orderButtonExists
                &&
                <ButtonComponent
                    buttonType={serviceOrdered ? "inactive" : "confirm"}
                    onClickHandler={e => openModal(e)}
                >
                    {serviceOrdered ? "Service Ordered!" : "Order Service"}
                </ButtonComponent>
            }
        </div>
    )
}

export default ProviderCard

const OrderServiceModal = ({ firstName, lastName }) => {

    const { toggleModal } = useContext(ModalContext);

    return(
        <Fragment>
            <h2>{`Do you really wish to order this service from ${firstName} ${lastName}?`}</h2>
            <ButtonComponent buttonType={'confirm'}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}