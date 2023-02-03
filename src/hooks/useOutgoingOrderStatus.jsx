function useOutgoingOrderStatus(transaction) {

  const { transactionOrdered, orderConfirmed, orderDenied, orderCompleted, completionConfirmed } = transaction;

    const outgoingOrderStatus = {
      nextStage: undefined,
      className: undefined,
      text: undefined,
      denied: 'denied'
    }

    if(transactionOrdered & !orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'order-pending';
        outgoingOrderStatus.text = 'Your Request was Sent to the Provider';
    } else if(transactionOrdered & !orderConfirmed & orderDenied & !orderCompleted & !completionConfirmed){
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'order-denied'
        outgoingOrderStatus.text = 'Your Request was Denied by the Provider';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'secondary-confirm'
        outgoingOrderStatus.text = 'Your Request was Accepted by the Provider';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & !completionConfirmed){
        outgoingOrderStatus.nextStage = 'completion-confirmed';
        outgoingOrderStatus.className = 'confirm'
        outgoingOrderStatus.text = 'The Provider has Completed the Task. Click Here To Confirm!';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & completionConfirmed){
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'inactive';
        outgoingOrderStatus.text = 'This Transaction has been Completed!';
    }

  return outgoingOrderStatus;
}

export default useOutgoingOrderStatus