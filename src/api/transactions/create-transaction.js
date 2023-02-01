import axios from 'axios';

export const createTransaction = async (transactionData, onSuccessFunction, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/create-transaction`, {
            serviceId: transactionData.serviceId,
            providingUserId: transactionData.providingUserId,
            receivingUserId: transactionData.receivingUserId,
            dateIssued: new Date(),
        })
        onSuccessFunction('Service successfuly ordered. Check your transactions to see the status of your order.')
        console.log(response);
        
    } catch(error){
        onErrorFunction(error);
    }
}