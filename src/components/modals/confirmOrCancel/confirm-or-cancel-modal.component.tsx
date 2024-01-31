import React, { Fragment, useContext } from 'react'

import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button.component'

interface Props{
    prompt: string;
    onConfirm: () => void;
}

const ConfirmOrCancelModal = ({prompt, onConfirm}: Props) => {

    const {toggleModal} = useContext(ModalContext)

    const confirmAndCloseModal = () => {
        onConfirm();
        toggleModal();
    }

    const onCancel = (e: React.MouseEvent<HTMLElement>) => {
        toggleModal()
    }

    return (
        <Fragment>
            <h2>{prompt}</h2>
            <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={confirmAndCloseModal}>Confirm</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={onCancel}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default ConfirmOrCancelModal