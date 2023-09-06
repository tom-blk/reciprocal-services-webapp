import { useContext, Fragment, useEffect, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ButtonComponent from "../../buttons/button.component";

import { createOrder } from "../../../api/orders/create";

import './orderServiceModal.styles.css';


const OrderServiceModal = ({ providingUserId, providingUserFirstName, providingUserLastName, serviceId, serviceName, embersPerHour, serviceOrderedCallback }) => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const orderDataTemplate = {
        serviceId: serviceId,
        providingUserId: providingUserId,
        receivingUserId: user.id,
        message: '',
        embersPerHour: embersPerHour
    }

    const [orderData, setOrderData] = useState(orderDataTemplate);

    useEffect(() => {console.log(orderData)},[orderData])

    const messageLengthBelowLimit = () => (orderData.message.length <= 5000);

    const onClickHandler = () => {
        if(messageLengthBelowLimit()){
            createOrder(orderData)
                .then(response => {
                    displaySuccessMessage(response.message);
                    serviceOrderedCallback();
                    toggleModal();
                })
                .catch(error => displayError(error))
        }else{
            displayError(new Error('Please use less than 5000 characters in your message'))
        }
    }

    const onOrderMessageChangeHandler = (e) => {
        setOrderData({ ...orderData, message: e.target.value })
    }

    return(
        <Fragment>
            <h2>{`Do you really wish to order the service ${serviceName} from ${providingUserFirstName} ${providingUserLastName}?`}</h2>
            <h3>{`The hourly fare is ${embersPerHour} embers per hour.`}</h3>
            <div className="order-service-modal-message-container">
                <div className="flex-space-between">
                    <span>Message:</span>
                    <span className={`${!messageLengthBelowLimit() && 'warning-text'}`}>{`${orderData.message.length}/5000 Characters`}</span>
                </div>
                <textarea className="text-area" onChange={e => onOrderMessageChangeHandler(e)} type='text' rows='10'></textarea>
            </div>
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default OrderServiceModal