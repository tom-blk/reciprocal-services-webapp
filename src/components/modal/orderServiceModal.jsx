import { useContext, Fragment, useEffect, useState } from "react";

import { ModalContext } from "../../context/modal.context";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import ButtonComponent from "../button/button.component";

import { createOrder } from "../../api/orders/create";

import './orderServiceModal.styles.css';


const OrderServiceModal = ({ providingUserId, providingUserFirstName, providingUserLastName, serviceId, serviceName, serviceOrderedCallback }) => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const orderDataTemplate = {
        serviceId: serviceId,
        providingUserId: providingUserId,
        receivingUserId: user.id,
        message: ''
    }

    const [orderData, setOrderData] = useState(orderDataTemplate);

    const onClickHandler = () => {
        createOrder(orderData)
            .then(displaySuccessMessage('Service successfully ordered'))
            .catch(error => displayError(error))
        serviceOrderedCallback();
        toggleModal();
    }

    const onOrderMessageChangeHandler = (e) => {
        setOrderData({ ...orderData, message: e.target.value })
    }

    return(
        <Fragment>
            <h2>{`Do you really wish to order the service ${serviceName} from ${providingUserFirstName} ${providingUserLastName}?`}</h2>
            <span>Message:</span>
            <textarea className="text-area" onChange={e => onOrderMessageChangeHandler(e)} style={{width:'70%'}} type='text' rows='10'></textarea>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default OrderServiceModal