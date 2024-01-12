import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/buttons/button.component";

import './login.styles.scss'
import { logIn } from "../../api/auth/log-in";
import { AlertMessageContext } from "../../context/alert-message.context";
import { UserContext } from "../../context/user.context";
import { getUser } from "../../api/auth/get-user";

const LogIn = () => {

    const navigate = useNavigate()

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { setUser } = useContext(UserContext);

    const emptyLoginForm = {
        email: '',
        password: ''
    }
    
    const [logInForm, setLogInForm] = useState(emptyLoginForm);
    const { email, password } = logInForm;

    const loginButtonOnClickHandler = () => {
        logIn(email, password, displayError, displaySuccessMessage)
            .then(response => {
                console.log(response);
                if(response === 'Login Successful'){
                    setLogInForm(emptyLoginForm)
                    getUser()
                        .then(response => {
                            setUser(response)
                            displaySuccessMessage('Successfully Logged In!')
                        })
                        .catch(error => displayError(new Error('Something Went Wrong, Please Again.')));     
                } else {
                    displayError(new Error('Something Went Wrong, Please Try Logging In Again.'))
                }
                }
                
            )
            .catch(error => displayError(error))
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