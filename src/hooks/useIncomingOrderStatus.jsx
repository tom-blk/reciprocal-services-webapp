function useIncomingOrderStatus(transaction) {

  const { transactionOrdered, orderConfirmed, orderDenied, orderCompleted, completionConfirmed } = transaction;

    const incomingOrderStatus = {
      nextStage: undefined,
      className: undefined,
      text: undefined,
    }

    if(transactionOrdered & !orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        incomingOrderStatus.nextStage = 'confirmed';
        incomingOrderStatus.className = 'confirm';
        incomingOrderStatus.text = 'Accept Order';
    } else if(transactionOrdered & !orderConfirmed & orderDenied & !orderCompleted & !completionConfirmed){
        incomingOrderStatus.nextStage = undefined;
        incomingOrderStatus.className = 'order-denied'
        incomingOrderStatus.text = 'You have Denied this Order';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        incomingOrderStatus.nextStage = 'completed';
        incomingOrderStatus.className = 'secondary-confirm'
        incomingOrderStatus.text = 'Complete Order';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & !completionConfirmed){
        incomingOrderStatus.nextStage = undefined;
        incomingOrderStatus.className = 'confirm'
        incomingOrderStatus.text = 'Order Completed! Waiting for the Recipient to Confirm';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & completionConfirmed){
        incomingOrderStatus.nextStage = undefined;
        incomingOrderStatus.className = 'inactive'
        incomingOrderStatus.text = 'The Recipient has Confirmed the Completion';
    }

  return incomingOrderStatus;
}

export default useIncomingOrderStatus