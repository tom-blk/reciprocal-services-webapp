import axios from 'axios';

export const register = async (username, email, password, onErrorFunction, onSuccessFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/auth/register`, {
            username: username,
            email: email,
            password: password,
        })
        onSuccessFunction('Successfully registered!')
        console.log(response);
    } catch(error){
        onErrorFunction(error);
    }
}