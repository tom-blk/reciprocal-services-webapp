import { Fragment, useState } from "react"

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

    const [displaySuccess, setDisplaySuccess] = useState(false);

    const [user, setUser] = useState(undefined);

    const navigate = useNavigate()

    const signUp = () => {
        console.log("signup fired")
        if(email != "" & password === confirmedPassword){
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    setErrorCode("");
                    setErrorMessage("");
                    setUser(userCredentials.user)
                })
                .then(() => {
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
            setErrorCode("Content Missing:")
            setErrorMessage("Please check your input data.")
        }
    }

    return(
        <MaxSizeContainer>
        <div>
            <h3>Signup</h3>
            <div>Input your Email Address</div>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <div>Select A Password</div>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <div>Confirm Your Password</div>
            <input type="password" placeholder="Confirm Password" onChange={e => setConfirmedPassword(e.target.value)}/>
            <button onClick={e => signUp()}>Join Us!</button>
            {
                errorCode || errorMessage != ""
                ?
                <div style={{color: "red"}}>{errorCode + " " + errorMessage}</div>
                :
                <Fragment/>
            }
            {
                displaySuccess
                ?
                <div style={{color: "green"}}>Account Successfully Created, You Will Be Redirected To Home</div>
                :
                <Fragment/>
            }
        </div>
        </MaxSizeContainer>
    )
}

export default SignUp