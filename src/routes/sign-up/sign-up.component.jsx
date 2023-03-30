import { useContext, useState } from "react"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { AlertMessageContext } from "../../context/alert-message.context";
import ButtonComponent from "../../components/button/button.component";

const emptySignUpForm = {
    email: '',
    password: '',
    confirmedPassword: ''
}

const SignUp = () => {

    const navigate = useNavigate()

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const [signUpForm, setSignUpForm] = useState(emptySignUpForm);
    const {email, password, confirmedPassword} = signUpForm;

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        console.log(user);
    }, [user])

    const handleSignUpFormChange = (event) => {
        const {name, value} = event.target;

        setSignUpForm({ ...signUpForm, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === ''){
            displayError(new Error('Error: Email is missing.'))
            return;
        }

        if(password === ''){
            displayError(new Error('Error: Password is missing.'))
            return;
        }

        if(password !== confirmedPassword){
            displayError(new Error('Error: Passwords do not match.'))
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            setUser(response.user)

            displaySuccessMessage('Account successfully created!')
                setTimeout(() => {
                    navigate('/')
                }, 3000)
        } catch(error){
            displayError(error)
        }
    }

    return(
        <div className="auth-pages-container">
            <form className="auth-pages-centered" onSubmit={handleSubmit}>
                <h3>Signup</h3>
                <label>Input your Email Address</label>
                <input 
                    required
                    value={email}
                    type="email" 
                    name='email'
                    placeholder="Email" 
                    className="auth-input"
                    onChange={handleSignUpFormChange}
                />
                <label>Select A Password</label>
                <input 
                    required
                    value={password}
                    type="password" 
                    name='password'
                    placeholder="Password" 
                    className="auth-input"
                    onChange={handleSignUpFormChange}
                />
                <label>Confirm Your Password</label>
                <input 
                    required
                    value={confirmedPassword}
                    type="password" 
                    name='confirmedPassword'
                    placeholder="Confirm Password" 
                    className="auth-input"
                    onChange={handleSignUpFormChange}
                />
                <ButtonComponent 
                    type='submit'
                    buttonType='confirm'
                >
                    Join Us!
                </ButtonComponent>
            </form>
        </div>
    )
}

export default SignUp