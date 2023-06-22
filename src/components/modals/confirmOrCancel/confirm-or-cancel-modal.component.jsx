import React, { Fragment, useContext } from 'react'

import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button.component'

const ConfirmOrCancelModal = ({prompt, onConfirm}) => {

    const {toggleModal} = useContext(ModalContext)

    const confirmAndCloseModal = () => {
        onConfirm();
        toggleModal();
    }

    return (
        <Fragment>
            <h2>{prompt}</h2>
            <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={confirmAndCloseModal}>Confirm</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default ConfirmOrCancelModal