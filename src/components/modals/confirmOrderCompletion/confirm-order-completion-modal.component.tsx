import React, { Fragment, useContext, useEffect, useState } from 'react'

import { ModalContext } from '../../../context/modal.context'
import { UserContext } from '../../../context/user.context';

import ButtonComponent from '../../buttons/button.component'
import RateUserComponent from '../../rating/rate-user-component/rate-user.component'

import { getSingleUser } from '../../../api/users/read'
import { confirmOrderCompletionRateUserAndTransferCredits } from '../../../api/orders/update';

import { assertDisplayName } from '../../../helper-functions/users/assertDisplayName';
import { Order } from '../../../types/orders';
import { Provider } from '../../../types/users';
import AlertMessageComponent from '../../alerts/alert-message.component';
import { errorMessageOptions, successMessageOptions } from '../../alerts/alertMessageTypes';
import { toast } from 'react-toastify';

interface Props{
    providerId: number;
    order: Order;
    confirmedCompletionCallback: () => void;
}

const ConfirmOrderCompletionModalComponent = ({providerId, order, confirmedCompletionCallback}: Props) => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);

    const [rating, setRating] = useState<number | undefined>(undefined);
    const [provider, setProvider] = useState<Provider | undefined>(undefined);
    const [doubleConfirmButtonVisible, setDoubleConfirmButtonVisible] = useState<boolean>(false); // Failsafe so that user doesn't accidentally input wrong number of hours

    useEffect(() => {
        getSingleUser(providerId)
            .then(response => setProvider(response))
    }, [providerId])

    const onSetRating = (star: number) => {
        setRating(star);
    }

    const confirmRatingAndCloseModal = () => {
        if(user && order.hoursProvided){
            const totalEmbers = order.creditsPerHour * order.hoursProvided
            if(user.credits < totalEmbers){
                toast(<AlertMessageComponent errorMessage='Insufficient Embers to Complete Transaction'/>, errorMessageOptions)
            } else if(!rating){
                toast(<AlertMessageComponent errorMessage='Please rate the user to confirm the completion of the order!'/>, errorMessageOptions)
            } else {
                confirmOrderCompletionRateUserAndTransferCredits(order.id, providerId, user.id, totalEmbers, rating)
                    .then(response => {
                        toast(<AlertMessageComponent successMessage={response.message}/>, successMessageOptions);
                        confirmedCompletionCallback();
                        toggleModal();
                    })
                    .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
            }
        } else {
            toast(<AlertMessageComponent errorMessage='Something went wrong.'/>, errorMessageOptions)
        }
    }

    const toggleDoubleConfirmButtonVisible = () => {
        setDoubleConfirmButtonVisible(!doubleConfirmButtonVisible)
    }

    const onCancelWhileDoubleConfirmVisible = () => {
        setDoubleConfirmButtonVisible(false);
    }

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        toggleModal()
    }

    const displayTotalCredits = () => {
        if(order.hoursProvided){
            return order.creditsPerHour * order.hoursProvided
        } else {
            return "Error"
        }
    }

    return (
        provider
        ?
        <Fragment>
            <h2>Your Order has been Completed!</h2>
            <h3>Order Data:</h3>
            <span>{`Provider: ${assertDisplayName(provider)}`}</span>
            <span>{`Hours provided: ${order.hoursProvided}`}</span>
            <span>{`Hourly rate: ${order.creditsPerHour}`}</span>
            <span>{`Total Embers: ${displayTotalCredits()}`}</span>
            <h3>Rate User Before Confirming Order Completion: </h3>
            <RateUserComponent rating={rating} onSetRating={onSetRating}/>
            { !doubleConfirmButtonVisible && <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={toggleDoubleConfirmButtonVisible}>Confirm Rating and Order Completion</ButtonComponent>}
            { doubleConfirmButtonVisible && <ButtonComponent buttonType={'confirm'} onClickHandler={confirmRatingAndCloseModal}>Are You Sure?</ButtonComponent>}
            <ButtonComponent buttonType={'cancel'} onClickHandler={doubleConfirmButtonVisible ? onCancelWhileDoubleConfirmVisible : closeModal}>Cancel</ButtonComponent>
        </Fragment>
        :
        <></>
    )
}

export default ConfirmOrderCompletionModalComponent
