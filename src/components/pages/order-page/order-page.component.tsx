import { Fragment, useContext, useEffect, useState } from "react";
import { Order } from "../../../types/orders";
import { Service } from "../../../types/services";
import { Provider } from "../../../types/users";

import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";
import { OrderContext } from "../../../context/order.context";

import { useParams } from "react-router";

import useOrderStatus from "../../../hooks/useOrderStatus";

import PageContainer from "../../../utils/page-container/page-container.component";
import ButtonComponent from "../../buttons/button.component";
import ConfirmOrCancelModal from "../../modals/confirmOrCancel/confirm-or-cancel-modal.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";

import { getService } from "../../../api/services/read";
import { getSingleUser } from "../../../api/users/read";
import { getSingleOrder } from "../../../api/orders/read";

import { returnAppropriateOrderModal } from "../../../helper-functions/orders/returnAppropriateOrderModal";
import { setOrderStageToDenied } from "../../../helper-functions/orders/setOrderStageToDenied";
import { assertDisplayName } from "../../../helper-functions/users/assertDisplayName";

import "./order-page.styles.scss"
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions } from "../../alerts/alertMessageTypes";


const OrderPage = () => {

    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const { refetchOrdersAfterUpdating } = useContext(OrderContext)

    const { orderId } = useParams();

    const orderIdInt = parseInt(orderId!);

    const tempOrderTemplate = {
        id: 0,
        serviceId: 0,
        providingUserId: 0,
        receivingUserId: 0,
        hoursProvided: 0,
        creditsAwarded: 0,
        dateIssued: "",
        dateCompleted: "",
        status: 0,
        message: "",
        creditsPerHour: 0
    }

    const [tempOrder, setTempOrder] = useState<Order>(tempOrderTemplate); //MIMICS THE CHANGES IN THE DATABASE SO THAT CHANGES BECOME APPARENT WITHOUT HAVING TO REFETCH THE DATA
    const [service, setService] = useState<Service | undefined>(undefined);
    const [correspondingUser, setCorrespondingUser] = useState<Provider | undefined>(undefined);
    
    const orderStatus = useOrderStatus(tempOrder, user!.id);
    const orderDirection = orderStatus.orderDirection

    useEffect(() => {
        getSingleOrder(orderIdInt)
            .then(response => setTempOrder(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [orderIdInt])

    useEffect(() => {
        if(tempOrder.id !== 0){
            getService(tempOrder.serviceId)
                .then(response => setService(response))
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
            if(orderDirection === 'incoming'){
                getSingleUser(tempOrder.receivingUserId)
                    .then(response => setCorrespondingUser(response))
                    .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
            } else if(orderDirection === 'outgoing'){
                getSingleUser(tempOrder.providingUserId)
                    .then(response => setCorrespondingUser(response))
                    .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
            }
        }
    }, [tempOrder, orderDirection])

     // Needs to be passed all the way through to the function that ultimately calls the api to update the database so that it can update the frontend after update is successful (makes updating process feel faster)
     const onOrderStageModified = () => {
        setTempOrder({...tempOrder, status: orderStatus.nextStage})
    }

    // Needs to be passed all the way through to the function that ultimately calls the api to update the database so that it can update the frontend after update is successful (makes updating process feel faster)
    const onOrderStageDeclined = () => {
        setTempOrder({...tempOrder, status: 5})
    }

    const buttonOnClickHandler = () => {
        if(orderStatus.nextStage && tempOrder){
            toggleModal(returnAppropriateOrderModal(user!.id, tempOrder, orderStatus.nextStage, onOrderStageModified, refetchOrdersAfterUpdating));
        } else {
            toast(<AlertMessageComponent errorMessage='Something Went Wrong.'/>, errorMessageOptions)
        }
    }

    const declineButtonOnClickHandler = () => {
        if(tempOrder){
            const denyOrderInModal = () => setOrderStageToDenied(tempOrder, onOrderStageDeclined);
            toggleModal( <ConfirmOrCancelModal prompt={'Do You Really Want To Deny This Order?'} onConfirm={denyOrderInModal}/> )
        }else{
            toast(<AlertMessageComponent errorMessage='Something Went Wrong.'/>, errorMessageOptions)
        }
    }

    const returnConditionalCancelButton = () => {
        if(orderStatus.orderDirection === 'incoming' && orderStatus.nextStage === 2)
        return(
            <ButtonComponent
                buttonType={'cancel'}
                onClickHandler={declineButtonOnClickHandler}
            >
                Decline Order
            </ButtonComponent>
        )
    }

    const returnConditionalDateCompleted = () => {
        if(orderStatus.currentStage === 4)
        if(tempOrder?.dateCompleted)
        return(
            <div className="page-container-item-group">
                <h2>Date Completed:</h2>
                <h2 className="page-container-content"> {tempOrder.dateCompleted.toLocaleString()}</h2>
            </div>
        )
    }

    const returnConditionalTotalEmbers = () => {
        if(orderStatus.currentStage >= 3)
        if(tempOrder?.hoursProvided && tempOrder.creditsPerHour)
        return(
            <div className="page-container-item-group">
                <h2>Total Embers:</h2>
                <h2 className="page-container-content">{tempOrder.hoursProvided * tempOrder.creditsPerHour}</h2>
            </div>
        )
    }

    return(
        <PageContainer>
            {
                tempOrder && service && correspondingUser
                ?
                <Fragment>
                    <div className="order-page-heading">
                        <RoundImageContainer pictureIsPresent={service.icon} serviceOrUserId={service.id} serviceOrUser={'service'} size={'round-image-container-page'}/>
                        <div className="order-page-heading-flex overflow-control">
                            <h1 className="overflow-control-wrap">{`Order Of ${service.name}`}</h1>
                            <div className="flex">
                            <ButtonComponent 
                                buttonType={orderStatus.buttonClassName}
                                onClickHandler={buttonOnClickHandler}
                            >
                                {orderStatus.text}
                            </ButtonComponent>
                            { returnConditionalCancelButton() } 
                            </div>
                        </div>
                    </div>

                    <div className="page-container-item-group">
                        <h2>{`${orderStatus.correspondingUserRole}:`}</h2>
                        <h2 className="page-container-content">{assertDisplayName(correspondingUser)}</h2>
                    </div>

                    <div className="page-container-item-group">
                        <h2>Date Issued:</h2>
                        <h2 className="page-container-content">{tempOrder.dateIssued.toLocaleString()}</h2>
                    </div>
                    
                    { returnConditionalDateCompleted() }
                    { returnConditionalTotalEmbers() }

                    <div className="page-container-item-group">
                        <h2>Message:</h2>
                        <span className="page-container-content preformatted-message">{tempOrder.message}</span>
                    </div>
                </Fragment>
                :
                <span>Something went wrong...</span>
            }
            
        </PageContainer>
    )
}

export default OrderPage