function useOrderStatus(order, userId) {

    const orderStatus = {
      orderDirection: undefined,
      correspondingUserRole: undefined,
      currentStage: undefined,
      nextStage: undefined,
      buttonClassName: undefined,
      text: undefined,
    }

    if(order){
      if(order.providingUserId === userId){
        orderStatus.orderDirection = 'incoming';
        orderStatus.correspondingUserRole = 'Recipient';
        switch(order.status){
          case 1:
            orderStatus.currentStage = 1;
            orderStatus.nextStage = 2;
            orderStatus.buttonClassName = 'confirm';
            orderStatus.text = 'Accept';
            break;
          case 2:
            orderStatus.currentStage = 2;
            orderStatus.nextStage = 3;
            orderStatus.buttonClassName = 'confirm'
            orderStatus.text = 'Complete';
            break;
          case 3:
            orderStatus.currentStage = 3;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'secondary-confirm-no-hover'
            orderStatus.text = 'Comfirmation Pending';
            break;
          case 4:
            orderStatus.currentStage = 4;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'inactive'
            orderStatus.text = 'Completion Comfirmed';
            break;
          case 5:
            orderStatus.currentStage = 5;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'order-denied'
            orderStatus.text = 'Declined';
            break;
        }
      }
  
      if(order.receivingUserId === userId){
        orderStatus.orderDirection = 'outgoing';
        orderStatus.correspondingUserRole = 'Provider';
        switch(order.status){
          case 1:
            orderStatus.currentStage = 1;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'order-pending';
            orderStatus.text = 'Requested';
            break;
          case 2:
            orderStatus.currentStage = 2;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'secondary-confirm-no-hover'
            orderStatus.text = 'Accepted';
            break;
          case 3:
            orderStatus.currentStage = 3;
            orderStatus.nextStage = 4;
            orderStatus.buttonClassName = 'confirm'
            orderStatus.text = 'Confirm Completion';
            break;
          case 4:
            orderStatus.currentStage = 4;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'inactive'
            orderStatus.text = 'Complete';
            break;
          case 5:
            orderStatus.currentStage = 5;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'order-denied';
            orderStatus.text = 'Declined';
            break;
        }
      }
    }

  return orderStatus;
}

export default useOrderStatus