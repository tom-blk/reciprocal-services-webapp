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
            orderStatus.text = 'Accept Order';
            break;
          case 2:
            orderStatus.currentStage = 2;
            orderStatus.nextStage = 3;
            orderStatus.buttonClassName = 'confirm'
            orderStatus.text = 'Complete Order';
            break;
          case 3:
            orderStatus.currentStage = 3;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'secondary-confirm-no-hover'
            orderStatus.text = 'Waiting For Comfirmation';
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
            orderStatus.text = 'Order Declined';
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
            orderStatus.text = 'Order Requested';
            break;
          case 2:
            orderStatus.currentStage = 2;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'secondary-confirm-no-hover'
            orderStatus.text = 'Order Accepted';
            break;
          case 3:
            orderStatus.currentStage = 3;
            orderStatus.nextStage = 4;
            orderStatus.buttonClassName = 'confirm'
            orderStatus.text = 'Confirm Order Completion';
            break;
          case 4:
            orderStatus.currentStage = 4;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'inactive'
            orderStatus.text = 'This Order is Complete!';
            break;
          case 5:
            orderStatus.currentStage = 5;
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'order-denied';
            orderStatus.text = 'Your Request was Declined by the Provider';
            break;
        }
      }
    }

  return orderStatus;
}

export default useOrderStatus