import { useContext, Fragment, useEffect, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";
import { AlertMessageContext } from "../../../context/alert-message.context";

import ButtonComponent from "../../buttons/button.component";

import { createOrder } from "../../../api/orders/create";

import LimitedMessage from "../../limited-mesage/limited-message.component";


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

    useEffect(() => {console.log(orderData.message)},[orderData])

    const setOrderMessage = (orderMessage) => {
        setOrderData({...orderData, message: orderMessage})
    }
    
    const onClickHandler = () => {
        if(orderData.message){
            createOrder(orderData)
                .then(response => {
                    displaySuccessMessage(response.message);
                    serviceOrderedCallback();
                    toggleModal();
                })
                .catch(error => displayError(error))
        }else{
            displayError(new Error('Please use less than 5000 characters in your message.'))
        }
    }

    return(
        <Fragment>
            <h2>{`Do you really wish to order the service ${serviceName} from ${providingUserFirstName} ${providingUserLastName}?`}</h2>
            <h3>{`The hourly fare is ${embersPerHour} embers per hour.`}</h3>
            <LimitedMessage numberOfCharacters={5000} numberOfTextRows={5} onChangeHandler={setOrderMessage} />
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default OrderServiceModal