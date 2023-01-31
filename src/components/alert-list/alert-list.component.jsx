import React from 'react'
import { useContext } from 'react';

import AlertComponent from '../alert/alert.component';

import { AlertContext } from '../../context/alert.context';

import './alert-list.styles.scss';

const AlertList = () => {

    const alertContext = useContext(AlertContext);

    return (
    <div className='alert-list-container'>
        {
            alertContext.successMessages.map((successMessage, index) => {
                return(
                    <AlertComponent key={index} alertType={'success-message'}>{successMessage}</AlertComponent>
                )
            })
        }
        {
            alertContext.errorMessages.map((errorMessage, index) => {
                return(
                    <AlertComponent key={index} alertType={'error-message'}>{errorMessage}</AlertComponent>
                )
            })
        }
    </div>
    )
}

export default AlertList