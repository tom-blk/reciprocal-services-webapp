import React, { Fragment, useContext, useState } from 'react'

import { AlertMessageContext } from '../../../context/alert-message.context'
import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button.component'

import { specifyProvidedHours } from '../../../api/orders/update'
import LimitedTextInput from '../../limited-text-input/limited-text-input.component'

const SetHoursWorkedModal = ({orderId, confirmedCompletionCallback}) => {

    const {displaySuccessMessage, displayError} = useContext(AlertMessageContext);
    const {toggleModal} = useContext(ModalContext);

    const [hoursWorked, setHoursWorked] = useState(0);
    const [doubleConfirmButtonVisible, setDoubleConfirmButtonVisible] = useState(false); // Failsafe so that user doesn't accidentally input wrong number of hours

    const confirmWorkedHoursAndCloseModal = () => {
        if(hoursWorked === 0 || hoursWorked === false || hoursWorked.length === 0 || isNaN(hoursWorked)){
            displayError(new Error("Please Specify How Many Hours Were Provided!"))
        }else{
            specifyProvidedHours(orderId, hoursWorked, displaySuccessMessage, displayError)
            .then(response => {
                displaySuccessMessage(response.message)
                confirmedCompletionCallback()
                toggleModal();
            })
            .catch(error => displayError(error))
        }
    }

    const toggleDoubleConfirmButtonVisible = () => {
        setDoubleConfirmButtonVisible(!doubleConfirmButtonVisible)
    }

    const onCancelWhileDoubleConfirmVisible = () => {
        setDoubleConfirmButtonVisible(false);
    }

    return (
    <Fragment>
        <span>State How Many Hours You Provided</span>
        <LimitedTextInput inputLabel={'Hours Provided'} numberOfCharacters={9} numberOfTextRows={1} onChangeHandler={(input) => setHoursWorked(input)} />
        { !doubleConfirmButtonVisible && <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={toggleDoubleConfirmButtonVisible}>Confirm Number of Hours</ButtonComponent> }
        { doubleConfirmButtonVisible && <ButtonComponent buttonType={'confirm'} onClickHandler={confirmWorkedHoursAndCloseModal}>Complete Order</ButtonComponent> }
        <ButtonComponent buttonType={'cancel'} onClickHandler={doubleConfirmButtonVisible ? onCancelWhileDoubleConfirmVisible : toggleModal}>Cancel</ButtonComponent>
    </Fragment>
    )
}

export default SetHoursWorkedModal
