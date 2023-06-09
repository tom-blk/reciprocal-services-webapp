import React, { Fragment, useContext, useState } from 'react'

import { AlertMessageContext } from '../../context/alert-message.context'
import { ModalContext } from '../../context/modal.context'

import ButtonComponent from '../button/button.component'
import RatingStarComponent from '../rating-star-component/rating-star.component'

import { rateUser } from '../../api/users/update'

const ConfirmOrderCompletionModalComponent = ({providerId, confirmedCompletionCallback}) => {

    const {displaySuccessMessage, displayError} = useContext(AlertMessageContext);
    const {toggleModal} = useContext(ModalContext);

    const [rating, setRating] = useState(undefined);

    const setRatingHandler = (starClicked) => {
        setRating(starClicked);
    }

    const confirmRatingAndCloseModal = () => {
        if(rating){
            rateUser(providerId, rating, displaySuccessMessage, displayError)
                .then(confirmedCompletionCallback())
                .catch(error => displayError(error))
            toggleModal();
        }
        if(!rating)
        displayError(new Error("Please rate the user to confirm the completion of the order!"))
    }

    const stars = [1,2,3,4,5];

    return (
    <Fragment>
        <span>Rate User Before Confirming Order Completion: </span>
        <div style={{display: 'flex', width: '30%'}}>
            {
                stars.map(star => {
                    return(
                        <RatingStarComponent key={star} starNumber={star} onClickHandler={setRatingHandler} color={rating >= star ? '#ffbf00' : 'grey'}/>
                    )
                })
            }
        </div>
        <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={confirmRatingAndCloseModal}>Confirm Rating and Order Completion</ButtonComponent>
    </Fragment>
    )
}

export default ConfirmOrderCompletionModalComponent
