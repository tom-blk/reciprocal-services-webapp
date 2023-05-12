import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/button/button.component";

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
            .then( 
                response => {
                    document.cookie = `userAuthenticationToken = ${response}`;
                    setLogInForm(emptyLoginForm);
                    getUser(document.cookie.split('=')[1], displayError)
                        .then(response => setUser(response)); 
                }
            )
    }

    const handleLogInFormChange = (event) => {
        const {name, value} = event.target;

        setLogInForm({ ...logInForm, [name]: value })
    }

    const signUpButtonOnClickHandler = () => {
        navigate('/sign-up');
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
                />
                <input 
                    className="input auth-input"
                    type={"password"}
                    name='password'
                    placeholder="Password"
                    onChange={handleLogInFormChange}
                />
                <ButtonComponent onClickHandler={loginButtonOnClickHandler} buttonType="confirm">Login</ButtonComponent>
                <ButtonComponent onClickHandler={signUpButtonOnClickHandler} buttonType="secondary-confirm secondary-confirm-hover">Sign Up</ButtonComponent>
                <Link to='/sign-up' className="forgot-password-prompt">I forgot my password...</Link>
            </div>
        </div> 
    )
}

export default LogIn