function useIncomingOrderStatus(status) {

    const incomingOrderStatus = {
      nextStage: undefined,
      className: undefined,
      text: undefined,
    }

    switch(status){
      case 1:
        incomingOrderStatus.nextStage = 2;
        incomingOrderStatus.className = 'confirm';
        incomingOrderStatus.text = 'Accept Order';
        break;
      case 2:
        incomingOrderStatus.nextStage = 3;
        incomingOrderStatus.className = 'confirm'
        incomingOrderStatus.text = 'Complete Order';
        break;
      case 3:
        incomingOrderStatus.nextStage = undefined;
        incomingOrderStatus.className = 'secondary-confirm'
        incomingOrderStatus.text = 'Order Completed! Waiting for the Recipient to Confirm';
        break;
      case 4:
        incomingOrderStatus.nextStage = undefined;
        incomingOrderStatus.className = 'inactive'
        incomingOrderStatus.text = 'The Recipient has Confirmed the Completion';
        break;
      case 5:
        incomingOrderStatus.nextStage = undefined;
        incomingOrderStatus.className = 'order-denied'
        incomingOrderStatus.text = 'You have Denied this Order';
        break;
    }

  return incomingOrderStatus;
}

export default useIncomingOrderStatus