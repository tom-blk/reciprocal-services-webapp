import React, { Fragment, useContext, useState } from 'react'

import { ModalContext } from '../../../context/modal.context'

import ButtonComponent from '../../buttons/button.component'
import { addServiceToUserServices, removeServiceFromUserServices } from '../../../api/users/update'
import { UserContext } from '../../../context/user.context'
import { Service } from '../../../types/services'
import AlertMessageComponent from '../../alerts/alert-message.component'
import { errorMessageOptions, successMessageOptions } from '../../alerts/alertMessageTypes'
import { toast } from 'react-toastify'

interface Props{
    service: Service;
    addOrRemove: 'add' | 'remove';
    onConfirmCallback: (action: 'add' | 'remove') => void
}

const AddOrRemoveSingleUserServiceModal = ({service, addOrRemove, onConfirmCallback}: Props) => {

    const {toggleModal} = useContext(ModalContext)
    const {user, fetchUser} = useContext(UserContext);

    const [embersPerHour, setEmbersPerHour] = useState<string | undefined>(undefined);

    const confirmAndCloseModal = () => {
        if(addOrRemove === 'add'){
            if(!embersPerHour){
                toast(<AlertMessageComponent errorMessage='Please specify Embers per hour!'/>, errorMessageOptions);
            } else if(!isNaN(Number(embersPerHour))){
                addServiceToUserServices(user!.id, service.id, Number(embersPerHour))
                .then(() => {
                    fetchUser()
                    onConfirmCallback(addOrRemove);
                    toggleModal();
                    toast(<AlertMessageComponent successMessage={`Service ${service.name} Successfully Added to Your Services with ${embersPerHour} Embers Per Hour.`}/>, successMessageOptions)
                })
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
            }
        }
        if(addOrRemove === 'remove'){
            removeServiceFromUserServices(user!.id, service.id)
                .then(() => {
                    fetchUser()
                    onConfirmCallback(addOrRemove);
                    toggleModal();
                    toast(<AlertMessageComponent successMessage={`Service ${service.name} Successfully Removed from Your Services.`}/>, successMessageOptions);
                })
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)});
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

    const toggleOnClick = () => {
        toggleModal()
    }

    return (
        <Fragment>
            <h2>{`Do You Want to ${addOrRemove === 'add' ? 'Add' : 'Remove'} the Service ${service.name} ${addOrRemove === 'add' ? 'to' : 'from'} Your Services?`}</h2>

            { returnConditionalEmbersPerHourInput() }
            
            <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={confirmAndCloseModal}>Confirm</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={toggleOnClick}>Cancel</ButtonComponent>
        </Fragment>
    )
}

export default AddOrRemoveSingleUserServiceModal