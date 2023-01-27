import { useContext, useState } from "react"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ErrorContext } from "../../context/error.context";

const emptySignUpForm = {
    email: '',
    password: '',
    confirmedPassword: ''
}

const SignUp = () => {

    const navigate = useNavigate()

    const errorContext = useContext(ErrorContext);

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

    const handleSubmit = async () => {
        //because the submit 'button' is actually a div, the submit behaviour is non-standard and doesn't require e.preventDefault()

        if(email === ''){
            errorContext.displayErrorMessage(new Error('Error: Email is missing.'))
            return;
        }

        if(password === ''){
            errorContext.displayErrorMessage(new Error('Error: Password is missing.'))
            return;
        }

        if(password !== confirmedPassword){
            errorContext.displayErrorMessage(new Error('Error: Passwords do not match.'))
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            setUser(response.user)

            errorContext.displaySuccessMessage('Account successfully created!')
                setTimeout(() => {
                    navigate('/')
                }, 3000)
        } catch(error){
            errorContext.displayErrorMessage(error)
        }
    }

    return(
        <div className="auth-pages-container">
            <h3>Signup</h3>
            <form>
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
                <div 
                    className="button confirm-button"
                    onClick={() => handleSubmit()}
                >
                    Join Us!
                </div>
            </form>
        </div>
    )
}

export default SignUp