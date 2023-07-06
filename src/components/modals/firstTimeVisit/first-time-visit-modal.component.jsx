import React, { Fragment, useContext } from 'react'

import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button.component'

const FirstTimeVisitModal = () => {

    const {toggleModal} = useContext(ModalContext)

    const onConfirm = () => {
        localStorage.setItem('prometheusFirstTimeVisitToken', 'I have been here before!')
        toggleModal();
    }

    return (
        <Fragment>
            <h2>Welcome To Prometheus!</h2>
            <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={onConfirm}>Confirm</ButtonComponent>
        </Fragment>
    )
}

export default FirstTimeVisitModal