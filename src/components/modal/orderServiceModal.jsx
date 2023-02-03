import { useContext, Fragment, useEffect, useState } from "react";

import { ModalContext } from "../../context/modal.context";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import ButtonComponent from "../button/button.component";

import { createOrder } from "../../api/orders/create-order";

import './orderServiceModal.styles.css';


const OrderServiceModal = ({ providingUserId, providingUserFirstName, providingUserLastName, serviceId, serviceName, serviceOrderedCallback }) => {

    const { toggleModal } = useContext(ModalContext);
    const { testUser } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const orderData = {
        serviceId: serviceId,
        providingUserId: providingUserId,
        receivingUserId: testUser.id,
    }

    const onClickHandler = () => {
        createOrder(orderData, displaySuccessMessage, displayError);
        serviceOrderedCallback();
        toggleModal();
    }

    return(
        <Fragment>
            <h2>{`Do you really wish to order the service ${serviceName} from ${providingUserFirstName} ${providingUserLastName}?`}</h2>
            <ButtonComponent buttonType={'confirm'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default OrderServiceModal