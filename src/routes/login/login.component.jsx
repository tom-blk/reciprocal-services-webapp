import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";


import './login.styles.scss'

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

    return(
        <div className="auth-pages-container">
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
            <div onClick={e => signIn()} className="button confirm-button text" >Login</div>
            <Link to='/sign-up' className="button secondary-confirm-button text">Sign Up</Link>
            <Link to='/sign-up' className="forgot-password-prompt">I forgot my password...</Link>
        </div> 
    )
}

export default LogIn