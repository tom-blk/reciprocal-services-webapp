function useOrderStatus(order, userId) {

    const orderStatus = {
      orderDirection: undefined,
      correspondingUserRole: undefined,
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
            orderStatus.nextStage = 2;
            orderStatus.buttonClassName = 'confirm';
            orderStatus.text = 'Accept Order';
            break;
          case 2:
            orderStatus.nextStage = 3;
            orderStatus.buttonClassName = 'confirm'
            orderStatus.text = 'Complete Order';
            break;
          case 3:
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'secondary-confirm'
            orderStatus.text = 'Order Completed! Waiting for the Recipient to Confirm';
            break;
          case 4:
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'inactive'
            orderStatus.text = 'The Recipient has Confirmed the Completion';
            break;
          case 5:
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'order-denied'
            orderStatus.text = 'You have Denied this Order';
            break;
        }
      }
  
      if(order.receivingUserId === userId){
        orderStatus.orderDirection = 'outgoing';
        orderStatus.correspondingUserRole = 'Provider';
        switch(order.status){
          case 1:
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'order-pending';
            orderStatus.text = 'Your Request was Sent to the Provider';
            break;
          case 2:
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'secondary-confirm'
            orderStatus.text = 'The Provider has Accepted your Order!';
            break;
          case 3:
            orderStatus.nextStage = 4;
            orderStatus.buttonClassName = 'confirm'
            orderStatus.text = 'The Provider has Completed the Task. Click Here To Confirm!';
            break;
          case 4:
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'inactive'
            orderStatus.text = 'This Order is Complete!';
            break;
          case 5:
            orderStatus.nextStage = undefined;
            orderStatus.buttonClassName = 'order-denied';
            orderStatus.text = 'Your Request was Denied by the Provider';
            break;
        }
      }
    }

  return orderStatus;
}

export default useOrderStatus