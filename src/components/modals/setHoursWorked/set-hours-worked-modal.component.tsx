import React, { Fragment, useContext, useState } from 'react'

import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button.component'
import LimitedTextInput from '../../limited-text-input/limited-text-input.component'

import { specifyProvidedHours } from '../../../api/orders/update'
import { toast } from 'react-toastify'
import AlertMessageComponent from '../../alerts/alert-message.component'
import { errorMessageOptions, successMessageOptions } from '../../alerts/alertMessageTypes'


interface Props{
    orderId: number;
    confirmedCompletionCallback: () => void;
}

const SetHoursWorkedModal = ({orderId, confirmedCompletionCallback}: Props) => {

    const {toggleModal} = useContext(ModalContext);

    const [hoursWorked, setHoursWorked] = useState<number | boolean | string>(0);
    const [doubleConfirmButtonVisible, setDoubleConfirmButtonVisible] = useState<boolean>(false); // Failsafe so that user doesn't accidentally input wrong number of hours

    const confirmWorkedHoursAndCloseModal = () => {
        if(hoursWorked === 0 || hoursWorked === false){
            toast(<AlertMessageComponent errorMessage='Please Specify How Many Hours Were Provided!'/>, errorMessageOptions);
        }else if(isNaN(Number(hoursWorked))){
            toast(<AlertMessageComponent errorMessage='You can only use numbers here!'/>, errorMessageOptions);
        }else{
            specifyProvidedHours(orderId, Number(hoursWorked))
                .then(response => {
                    toast(<AlertMessageComponent successMessage={response.message}/>, successMessageOptions)
                    confirmedCompletionCallback();
                    toggleModal();
                })
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
        }
    }

    const toggleDoubleConfirmButtonVisible = () => {
        setDoubleConfirmButtonVisible(!doubleConfirmButtonVisible);
    }

    const onCancelWhileDoubleConfirmVisible = (e: React.MouseEvent<HTMLElement>) => {
        setDoubleConfirmButtonVisible(false);
    }

    const onCancel = (e: React.MouseEvent<HTMLElement>) => {
        toggleModal();
    }

    return (
    <Fragment>
        <span>State How Many Hours You Provided</span>
        <span className='warning-text'>Be careful: Once the amount of hours is set, it cannot be reversed.</span>
        <LimitedTextInput defaultValue='' inputLabel={'Hours Provided'} numberOfCharacters={9} numberOfTextRows={1} onChangeHandler={(input: string | false) => setHoursWorked(input)} />
        { !doubleConfirmButtonVisible && <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={toggleDoubleConfirmButtonVisible}>Confirm Number of Hours</ButtonComponent> }
        { doubleConfirmButtonVisible && <ButtonComponent buttonType={'confirm'} onClickHandler={confirmWorkedHoursAndCloseModal}>Complete Order</ButtonComponent> }
        <ButtonComponent buttonType={'cancel'} onClickHandler={doubleConfirmButtonVisible ? onCancelWhileDoubleConfirmVisible : onCancel}>Cancel</ButtonComponent>
    </Fragment>
    );
}

export default SetHoursWorkedModal
