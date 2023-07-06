import React, { Fragment, useContext, useState } from 'react'

import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button.component'
import { addServiceToUserServices, removeServiceFromUserServices } from '../../../api/users/update'
import { UserContext } from '../../../context/user.context'
import { AlertMessageContext } from '../../../context/alert-message.context'

const AddOrRemoveSingleUserServiceModal = ({service, addOrRemove, onConfirmCallback}) => {

    const {toggleModal} = useContext(ModalContext)
    const {user} = useContext(UserContext);
    const {displayError, displaySuccessMessage} = useContext(AlertMessageContext);

    const [embersPerHour, setEmbersPerHour] = useState(undefined);

    console.log(embersPerHour);

    const confirmAndCloseModal = () => {
        if(addOrRemove === 'add'){
            addServiceToUserServices(user.id, service.id, embersPerHour)
                .then(() => {
                    onConfirmCallback(addOrRemove);
                    toggleModal();
                    displaySuccessMessage(`Service ${service.name} Successfully Added to Your Services with ${embersPerHour} Embers Per Hour.`)
                })
                .catch(error => displayError(error));
        }
        if(addOrRemove === 'remove'){
            removeServiceFromUserServices(user.id, service.id)
                .then(() => {
                    onConfirmCallback(addOrRemove);
                    toggleModal();
                    displaySuccessMessage(`Service ${service.name} Successfully Removed from Your Services.`);
                })
                .catch(error => displayError(error));
        }
    }

    const returnConditionalEmbersPerHourInput = () => {
        if(addOrRemove === "add"){
            return(
                <span>
                    <input type='text' className='number-input' onChange={e => {setEmbersPerHour(e.target.value)}} style={{width: '25px', textAlign:'right'}}/>
                    Embers Per Hour
                </span>
            )
        }
    }

    return (
        <Fragment>
            <h2>{`Do You Want to ${addOrRemove === 'add' ? 'Add' : 'Remove'} the Service ${service.name} ${addOrRemove === 'add' ? 'to' : 'from'} Your Services?`}</h2>

            { returnConditionalEmbersPerHourInput() }
            
            <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={confirmAndCloseModal}>Confirm</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleModal}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default AddOrRemoveSingleUserServiceModal