import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/buttons/button.component";

import './login.styles.scss'
import { logIn } from "../../api/auth/log-in";
import { UserContext } from "../../context/user.context";
import { getUser } from "../../api/auth/get-user";
import { toast } from "react-toastify";
import AlertMessageComponent from "../../components/alerts/alert-message.component";
import { errorMessageOptions, successMessageOptions } from "../../components/alerts/alertMessageTypes";

const LogIn = () => {

    const navigate = useNavigate()

    const { setUser } = useContext(UserContext);

    const emptyLoginForm = {
        email: '',
        password: ''
    }
    
    const [logInForm, setLogInForm] = useState(emptyLoginForm);
    const { email, password } = logInForm;

    const loginButtonOnClickHandler = () => {
        logIn(email, password)
            .then(response => {
                console.log(response);
                if(response === 'Login Successful'){
                    setLogInForm(emptyLoginForm)
                    getUser()
                        .then(response => {
                            setUser(response)
                            toast(<AlertMessageComponent successMessage='Sucessfully Logged In!'/>, successMessageOptions)
                        })
                        .catch(error => {toast(<AlertMessageComponent errorMessage='Something Went Wrong, Please Try Logging In Again.'/>, errorMessageOptions)});     
                } else {
                    toast(<AlertMessageComponent errorMessage='Something Went Wrong, Please Try Logging In Again.'/>, errorMessageOptions)
                }
                }
                
            )
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }

    const handleLogInFormChange = (event) => {
        const {name, value} = event.target;

        setLogInForm({ ...logInForm, [name]: value })
    }

    const signUpButtonOnClickHandler = () => {
        navigate('/sign-up');
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            loginButtonOnClickHandler()
        }
    }

    return(
        <div className="auth-pages-container">
            <div className="auth-pages-centered">
                <h3>Login</h3>
                <input 
                    className="input auth-input"
                    type={"email"} 
                    name='email'
                    placeholder="Email" 
                    onChange={handleLogInFormChange}
                    onKeyDown={handleKeyDown}
                />
                <input 
                    className="input auth-input"
                    type={"password"}
                    name='password'
                    placeholder="Password"
                    onChange={handleLogInFormChange}
                    onKeyDown={handleKeyDown}
                />
                <ButtonComponent onClickHandler={loginButtonOnClickHandler} buttonType="confirm">Login</ButtonComponent>
                <ButtonComponent onClickHandler={signUpButtonOnClickHandler} buttonType="secondary-confirm secondary-confirm-hover">Sign Up</ButtonComponent>
                <Link to='/sign-up' className="forgot-password-prompt">I forgot my password...</Link>
            </div>
        </div> 
    )
}

export default LogIn