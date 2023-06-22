import React, { Fragment, useContext, useState } from 'react'

import { AlertMessageContext } from '../../../context/alert-message.context'
import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button/button.component'

import { specifyProvidedHours } from '../../../api/orders/update'

const SetHoursWorkedModal = ({orderId, confirmedCompletionCallback}) => {

    const {displaySuccessMessage, displayError} = useContext(AlertMessageContext);
    const {toggleModal} = useContext(ModalContext);

    const [hoursWorked, setHoursWorked] = useState(0);

    const confirmWorkedHoursAndCloseModal = () => {
        if(hoursWorked !== 0){
            specifyProvidedHours(orderId, hoursWorked, displaySuccessMessage, displayError)
                .then(confirmedCompletionCallback())
                .catch(error => displayError(error))
            toggleModal();
        }
        if(!hoursWorked || hoursWorked === 0)
        displayError(new Error("Please Specify How Many Hours Were Provided!"))
    }

    return (
    <Fragment>
        <span>State How Many Hours You Provided</span>
        <input type='text' className='text-area' placeholder='Hours' onChange={e=> setHoursWorked(e.target.value)}/>
        <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={confirmWorkedHoursAndCloseModal}>Confirm Hours Worked and Complete Order</ButtonComponent>
    </Fragment>
    )
}

export default SetHoursWorkedModal
