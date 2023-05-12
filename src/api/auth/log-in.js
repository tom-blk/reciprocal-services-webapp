import axios from 'axios';

export const logIn = async (email, password, onErrorFunction, onSuccessFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/auth/log-in`, {
            email: email,
            password: password,
        })
        onSuccessFunction('Successfully logged in!')
        
        return response.data;
    } catch(error){
        onErrorFunction(error);
    }
}