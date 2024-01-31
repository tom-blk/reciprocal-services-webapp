import React, { useState } from "react"

import { useNavigate } from "react-router";

import ButtonComponent from "../../components/buttons/button.component";

import { register } from "../../api/auth/register";
import { toast } from "react-toastify";
import AlertMessageComponent from "../../components/alerts/alert-message.component";
import { errorMessageOptions, successMessageOptions } from "../../components/alerts/alertMessageTypes";

const emptySignUpForm = {
    username: '',
    email: '',
    password: '',
    confirmedPassword: ''
}

const SignUp = () => {

    const navigate = useNavigate()

    const [signUpForm, setSignUpForm] = useState(emptySignUpForm);
    const {username, email, password, confirmedPassword} = signUpForm;

    const handleSignUpFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setSignUpForm({ ...signUpForm, [name]: value })
    }

    const returnToLogin = () => navigate('/');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(username.length < 3){
            toast(<AlertMessageComponent errorMessage={'Error: Please choose a longer username.'}/>, errorMessageOptions)
            return
        }

        if(username.length > 45){
            toast(<AlertMessageComponent errorMessage={'Error: Please choose a shorter username.'}/>, errorMessageOptions)
            return
        }

        if(username.includes(' ')){
            toast(<AlertMessageComponent errorMessage={'Error: Username may not include a blank space.'}/>, errorMessageOptions)
            return
        }

        if(email === ''){
            toast(<AlertMessageComponent errorMessage={'Error: Email is missing.'}/>, errorMessageOptions)
            return;
        }

        if(!email.includes('@')){
            toast(<AlertMessageComponent errorMessage={'Error: Please Enter a valid email adress.'}/>, errorMessageOptions)
            return;
        }

        if(password === ''){
            toast(<AlertMessageComponent errorMessage={'Error: Password is missing.'}/>, errorMessageOptions)
            return;
        }

        if(password.length < 8){
            toast(<AlertMessageComponent errorMessage={'Error: Please choose a longer password.'}/>, errorMessageOptions)
            return;
        }

        if(password.includes(' ')){
            toast(<AlertMessageComponent errorMessage={'Error: Password may not contain a blank space.'}/>, errorMessageOptions)
            return;
        }

        if(password !== confirmedPassword){
            toast(<AlertMessageComponent errorMessage={'Error: Passwords do not match.'}/>, errorMessageOptions)
            return;
        }


        register(username, email, password)
            .then(response => {
                toast(<AlertMessageComponent successMessage={response}/>, successMessageOptions)
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            })
            .catch(error => {
                toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)
            })
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
                    buttonType='cancel'
                >
                    Return To Login
                </ButtonComponent>
            </form>
        </div>
    )
}

export default SignUp