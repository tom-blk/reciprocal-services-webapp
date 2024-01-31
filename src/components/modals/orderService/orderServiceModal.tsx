import { useContext, Fragment, useState } from "react";
import { Provider } from "../../../types/users";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";

import ButtonComponent from "../../buttons/button.component";
import LimitedTextInput from "../../limited-text-input/limited-text-input.component";

import { createOrder } from "../../../api/orders/create";
import { assertDisplayName } from "../../../helper-functions/users/assertDisplayName";
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions, successMessageOptions } from "../../alerts/alertMessageTypes";

interface Props{
    providingUser: Provider;
    serviceId: number;
    serviceName: string;
    embersPerHour: number;
    serviceOrderedCallback: () => void;
}

interface OrderData{
    serviceId: number;
    providingUserId: number;
    receivingUserId: number;
    message: string;
    embersPerHour: number;
}


const OrderServiceModal = ({ providingUser, serviceId, serviceName, embersPerHour, serviceOrderedCallback }: Props) => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);

    const orderDataTemplate: OrderData = {
        serviceId: serviceId,
        providingUserId: providingUser.id,
        receivingUserId: user!.id,
        message: '',
        embersPerHour: embersPerHour
    }

    const [orderData, setOrderData] = useState(orderDataTemplate);

    const setOrderMessage = (orderMessage: string) => {
        setOrderData({...orderData, message: orderMessage})
    }
    
    const onClickHandler = () => {
        if(orderData.message.length === 0){
            toast(<AlertMessageComponent errorMessage={'Please tell the provider more about your order.'}/>, errorMessageOptions)
        }else{
            createOrder(orderData)
                .then(response => {
                    toast(<AlertMessageComponent successMessage={response.message}/>, successMessageOptions);
                    serviceOrderedCallback();
                    toggleModal();
                })
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
        }
    }

    const onCancel = (e: React.MouseEvent<HTMLElement>) => {
        toggleModal()
    }

    return(
        <Fragment>
            <h2>{`Do you really wish to order the service ${serviceName} from ${assertDisplayName(providingUser)}?`}</h2>
            <h3>{`The hourly fare is ${embersPerHour} embers per hour.`}</h3>
            <LimitedTextInput defaultValue="" inputLabel={'Message'} numberOfCharacters={2500} numberOfTextRows={5} onChangeHandler={setOrderMessage} />
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={onClickHandler}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={onCancel}>{'Cancel'}</ButtonComponent>
        </Fragment>
    )
}

export default OrderServiceModal