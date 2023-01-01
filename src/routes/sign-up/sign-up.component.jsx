import { Fragment, useEffect, useState } from "react"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const [errorCode, setErrorCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorCodeVisible, setErrorCodeVisible] = useState(false);

    const [displaySuccess, setDisplaySuccess] = useState(false);

    const [user, setUser] = useState(undefined);

    const navigate = useNavigate()

    useEffect(() => {
        
    }, [errorCodeVisible === true])

    const signUp = () => {
        console.log("signup fired")
        if(email !== "" & password === confirmedPassword){
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    setErrorCode("");
                    setErrorMessage("");
                    setUser(userCredentials.user)
                })
                .then(() => {
                    console.log(user);
                    setDisplaySuccess(true)
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                })
                .catch(error => {
                    console.log(error)
                    setErrorCode(error.code);
                    setErrorMessage(error.message);
                })
        } else {
            checkEmailAndPassword();
        }
    }

    const checkEmailAndPassword = () => {
        if(email === "") {
            setErrorCode(`Content Missing: Email ${email} is not complete.`)
            setErrorMessage("Please check your input data.")
        } else if(password === "") {
            setErrorCode(`No Password chosen.`)
            setErrorMessage("Please choose a password")
        } else if(password !== confirmedPassword) {
            setErrorCode(`Password Mismatch:`)
            setErrorMessage("The two passwords you entered don't match.")
        }
    }

    return(
        <div className="auth-pages-container">
            <h3>Signup</h3>
            <div>Input your Email Address</div>
            <input 
                type="email" 
                placeholder="Email" 
                className="auth-input"
                onChange={e => setEmail(e.target.value)}
            />
            <div>Select A Password</div>
            <input 
                type="password" 
                placeholder="Password" 
                className="auth-input"
                onChange={e => setPassword(e.target.value)}
            />
            <div>Confirm Your Password</div>
            <input 
                type="password" 
                placeholder="Confirm Password" 
                className="auth-input"
                onChange={e => setConfirmedPassword(e.target.value)}
            />
            <div 
                className="button confirm-button"
                onClick={e => signUp()} 
            >Join Us!</div>
            {
                errorCodeVisible
                ?
                <div className="error-message">{errorCode + " " + errorMessage}</div>
                :
                <Fragment/>
            }
            {
                displaySuccess
                ?
                <div className="success-message">Account Successfully Created, You Will Be Redirected To Home</div>
                :
                <Fragment/>
            }
        </div>
    )
}

export default SignUp