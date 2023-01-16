function useTransactionCompletionStatus(transaction) {

  const { transactionOrdered, orderConfirmed, orderDenied, orderCompleted, completionConfirmed } = transaction;

    const completionStatus = {
      className: undefined,
      text: undefined
    }

    if(transactionOrdered & !orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        completionStatus.className = 'order-pending-button';
        completionStatus.text = 'Your Request was Sent to the Provider';
    } else if(transactionOrdered & !orderConfirmed & orderDenied & !orderCompleted & !completionConfirmed){
        completionStatus.className = 'order-denied-button'
        completionStatus.text = 'Your Request was Denied by the Provider';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        completionStatus.className = 'order-confirmed-button'
        completionStatus.text = 'Your Request was Accepted by the Provider';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & !completionConfirmed){
        completionStatus.className = 'order-completed-button'
        completionStatus.text = 'Confirm Completion of the Request';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & completionConfirmed){
        completionStatus.className = 'order-done-button'
        completionStatus.text = 'This Transaction has been Completed!';
    }

  return completionStatus;
}

export default useTransactionCompletionStatus