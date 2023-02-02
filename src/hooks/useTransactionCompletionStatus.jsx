function useTransactionCompletionStatus(transaction) {

  const { transactionOrdered, orderConfirmed, orderDenied, orderCompleted, completionConfirmed } = transaction;

    const completionStatus = {
      className: undefined,
      text: undefined
    }

    if(transactionOrdered & !orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        completionStatus.className = 'order-pending';
        completionStatus.text = 'Your Request was Sent to the Provider';
    } else if(transactionOrdered & !orderConfirmed & orderDenied & !orderCompleted & !completionConfirmed){
        completionStatus.className = 'order-denied'
        completionStatus.text = 'Your Request was Denied by the Provider';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
        completionStatus.className = 'secondary-confrim'
        completionStatus.text = 'Your Request was Accepted by the Provider';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & !completionConfirmed){
        completionStatus.className = 'confirm'
        completionStatus.text = 'The Provider has Completed the Task - Click Here To Confirm!';
    } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & completionConfirmed){
        completionStatus.className = 'inactive'
        completionStatus.text = 'This Transaction has been Completed!';
    }

  return completionStatus;
}

export default useTransactionCompletionStatus