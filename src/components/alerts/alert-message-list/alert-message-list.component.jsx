import React, {useContext} from 'react'

import AlertMessageComponent from '../alert-message/alert-message.component';

import { AlertMessageContext } from '../../../context/alert-message.context';

import './alert-message-list.styles.scss';

const AlertMessageList = () => {

    const alertMessageContext = useContext(AlertMessageContext);

    return (
    <div className='alert-list-container'>
        {
            alertMessageContext.successMessages.map((successMessage, index) => {
                console.log(successMessage)
                return(
                    <AlertMessageComponent key={index} alertType={'success-message'}>{successMessage}</AlertMessageComponent>
                )
            })
        }
        {
            alertMessageContext.errorMessages.map((errorMessage, index) => {
                return(
                    <AlertMessageComponent key={index} alertType={'error-message'}>{errorMessage}</AlertMessageComponent>
                )
            })
        }
    </div>
    )
}

export default AlertMessageList