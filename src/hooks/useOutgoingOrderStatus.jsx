function useOutgoingOrderStatus(status) {

    const outgoingOrderStatus = {
      nextStage: undefined,
      className: undefined,
      text: undefined,
    }

    switch(status){
      case 1:
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'order-pending';
        outgoingOrderStatus.text = 'Your Request was Sent to the Provider';
        break;
      case 2:
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'secondary-confirm'
        outgoingOrderStatus.text = 'The Provider has Accepted your Order!';
        break;
      case 3:
        outgoingOrderStatus.nextStage = 4;
        outgoingOrderStatus.className = 'confirm'
        outgoingOrderStatus.text = 'The Provider has Completed the Task. Click Here To Confirm!';
        break;
      case 4:
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'inactive'
        outgoingOrderStatus.text = 'The Provider has Completed the Task. Click Here To Confirm!';
        break;
      case 5:
        outgoingOrderStatus.nextStage = undefined;
        outgoingOrderStatus.className = 'order-denied';
        outgoingOrderStatus.text = 'Your Request was Denied by the Provider';
        break;
    }

  return outgoingOrderStatus;
}

export default useOutgoingOrderStatus