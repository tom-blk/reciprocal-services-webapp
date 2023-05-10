import axios from 'axios';

export const rateUser = async (userId, rating, onSuccessFunction, onErrorFunction) => {
    
    try{
        const response = await axios.put(`http://localhost:5000/users/rate-user`, {
            userId: userId,
            rating: rating
        })
        onSuccessFunction('Provider Successfully Rated!')
        console.log(response);
        
    } catch(error){
        onErrorFunction(error);
    }
}