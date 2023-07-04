import { useContext, useState, useEffect } from "react"

import { useNavigate } from "react-router";

import { AlertMessageContext } from "../../context/alert-message.context";
import ButtonComponent from "../../components/buttons/button.component";

import { register } from "../../api/auth/register";

const emptySignUpForm = {
    username: '',
    email: '',
    password: '',
    confirmedPassword: ''
}

const SignUp = () => {

    const navigate = useNavigate()

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const [signUpForm, setSignUpForm] = useState(emptySignUpForm);
    const {username, email, password, confirmedPassword} = signUpForm;

    const handleSignUpFormChange = (event) => {
        const {name, value} = event.target;

        setSignUpForm({ ...signUpForm, [name]: value })
    }

    const returnToLogin = () => navigate('/');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(username.length < 3){
            displayError(new Error('Error: Please choose a longer username.'))
            return
        }

        if(username.length > 45){
            displayError(new Error('Error: Please choose a shorter username.'))
            return
        }

        if(username.includes(' ')){
            displayError(new Error('Error: Username may not include a blank space.'))
            return
        }

        if(email === ''){
            displayError(new Error('Error: Email is missing.'))
            return;
        }

        if(!email.includes('@')){
            displayError(new Error('Error: Please Enter a valid email adress.'))
            return;
        }

        if(password === ''){
            displayError(new Error('Error: Password is missing.'))
            return;
        }

        if(password.length < 8){
            displayError(new Error('Error: Please choose a longer password.'))
            return;
        }

        if(password.includes(' ')){
            displayError(new Error('Error: Password may not contain a blank space.'))
            return;
        }

        if(password !== confirmedPassword){
            displayError(new Error('Error: Passwords do not match.'))
            return;
        }

        try {
            register(username, email, password, displayError, displaySuccessMessage);

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
                <label>Choose A Username</label>
                <input 
                    required
                    value={username}
                    type="text" 
                    name='username'
                    placeholder="Username" 
                    className="auth-input"
                    onChange={handleSignUpFormChange}
                />
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
                <ButtonComponent 
                    onClickHandler={returnToLogin}
                    type='button'
                    buttonType='cancel'
                >
                    Return To Login
                </ButtonComponent>
            </form>
        </div>
    )
}

export default SignUp