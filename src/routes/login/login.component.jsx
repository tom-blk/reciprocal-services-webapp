import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import MaxSizeContainer from '../../utils/max-size-container/max-size-container.component';
import PageContainer from '../../utils/page-container/page-container.component';


import './login.styles.scss'
import ButtonComponent from "../../components/button/button.component";

const LogIn = () => {

    const navigate = useNavigate()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorCode, setErrorCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useState(undefined);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setErrorCode('');
                setErrorMessage('');
                setUser(userCredential.user);
            })
            .then(() => {
                console.log(user);
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            })
            .catch((error) => {
                setErrorCode(error.code);
                setErrorMessage(error.message);
            });
    }

    const loginButtonOnClickHandler = () => {
        signIn();
    }

    const signUpButtonOnClickHandler = () => {
        navigate('/sign-up');
    }

    return(
        <div className="auth-pages-container">
            <div className="auth-pages-centered">
                <div className="heading">Login</div>
                <input 
                    className="input auth-input"
                    type={"email"} 
                    placeholder="email" 
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    className="input auth-input"
                    type={"password"} 
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                />
                {
                    errorCode & errorMessage !== ""
                    ?
                    <div style={{color: "red"}}></div>
                    :
                    <></>
                }
                <ButtonComponent onClickHandler={loginButtonOnClickHandler} buttonType="confirm">Login</ButtonComponent>
                <ButtonComponent onClickHandler={signUpButtonOnClickHandler} buttonType="secondary-confirm secondary-confirm-hover">Sign Up</ButtonComponent>
                <Link to='/sign-up' className="forgot-password-prompt">I forgot my password...</Link>
            </div>
        </div> 
    )
}

export default LogIn