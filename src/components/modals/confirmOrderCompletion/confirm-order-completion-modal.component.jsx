import React, { Fragment, useContext, useEffect, useState } from 'react'

import { AlertMessageContext } from '../../../context/alert-message.context'
import { ModalContext } from '../../../context/modal.context'
import { UserContext } from '../../../context/user.context';

import ButtonComponent from '../../buttons/button.component'
import RateUserComponent from '../../rating/rate-user-component/rate-user.component'

import { getSingleUser } from '../../../api/users/read'
import { confirmOrderCompletionRateUserAndTransferCredits } from '../../../api/orders/update';

import { assertDisplayName } from '../../../helper-functions/users/assertDisplayName';

const ConfirmOrderCompletionModalComponent = ({providerId, order, confirmedCompletionCallback}) => {

    const { displaySuccessMessage, displayError } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext)

    const [rating, setRating] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [doubleConfirmButtonVisible, setDoubleConfirmButtonVisible] = useState(false); // Failsafe so that user doesn't accidentally input wrong number of hours

    const totalEmbers = order.creditsPerHour * order.hoursProvided;

    useEffect(() => {
        getSingleUser(providerId)
            .then(response => setProvider(response))
    }, [])

    const onSetRating = (star) => {
        setRating(star);
    }

    const confirmRatingAndCloseModal = () => {
        if(user.credits < totalEmbers){
            displayError(new Error('Insufficient Embers to Complete Transaction'))
        }else{
            if(rating){
                confirmOrderCompletionRateUserAndTransferCredits(order.id, providerId, user.id, totalEmbers, rating)
                    .then(response => {
                        displaySuccessMessage(response.message);
                        confirmedCompletionCallback();
                        toggleModal();
                    })
                    .catch(error => displayError(error))
            }else{
                displayError(new Error("Please rate the user to confirm the completion of the order!"))
            }
        }
    }

    const toggleDoubleConfirmButtonVisible = () => {
        setDoubleConfirmButtonVisible(!doubleConfirmButtonVisible)
    }

    const onCancelWhileDoubleConfirmVisible = () => {
        setDoubleConfirmButtonVisible(false);
    }

    return (
        provider &&
        <Fragment>
            <h2>Your Order has been Completed!</h2>
            <h3>Order Data:</h3>
            <span>{`Provider: ${assertDisplayName(provider)}`}</span>
            <span>{`Hours provided: ${order.hoursProvided}`}</span>
            <span>{`Hourly rate: ${order.creditsPerHour}`}</span>
            <span>{`Total Embers: ${totalEmbers}`}</span>
            <h3>Rate User Before Confirming Order Completion: </h3>
            <RateUserComponent rating={rating} onSetRating={onSetRating}/>
            { !doubleConfirmButtonVisible && <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={toggleDoubleConfirmButtonVisible}>Confirm Rating and Order Completion</ButtonComponent>}
            { doubleConfirmButtonVisible && <ButtonComponent buttonType={'confirm'} onClickHandler={confirmRatingAndCloseModal}>Are You Sure?</ButtonComponent>}
            <ButtonComponent buttonType={'cancel'} onClickHandler={doubleConfirmButtonVisible ? onCancelWhileDoubleConfirmVisible : toggleModal}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default ConfirmOrderCompletionModalComponent
