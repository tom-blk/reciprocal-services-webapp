import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router";

import { ModalContext } from "../../context/modal.context";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import { createTransaction } from "../../api/transactions/create-transaction";

import ButtonComponent from "../button/button.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";

const ProviderCard = ({ user, serviceId, orderButtonExists }) => {

    const { toggleModal } = useContext(ModalContext);

    const {id, firstName, lastName, profilePicture} = user;

    const navigate = useNavigate()

    const [serviceOrdered, setServiceOrdered] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        toggleModal(<OrderServiceModal providingUserId={id} providingUserFirstName={firstName} providingUserLastName={lastName} serviceId={serviceId}/>);
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

const OrderServiceModal = ({ providingUserId, providingUserFirstName, providingUserLastName, serviceId }) => {

    const { toggleModal } = useContext(ModalContext);
    const { testUser } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const transactionData = {
        serviceId: serviceId,
        providingUserId: providingUserId,
        receivingUserId: testUser.id
    }

    const onClickHandler = () => {
        createTransaction(transactionData, displaySuccessMessage, displayError);
        toggleModal();
    }

    return(
        <Fragment>
            <h2>{`Do you really wish to order this service from ${providingUserFirstName} ${providingUserLastName}?`}</h2>
            <ButtonComponent buttonType={'confirm'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}