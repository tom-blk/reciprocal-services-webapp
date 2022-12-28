import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";

const LogIn = () => {
    
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
            .catch((error) => {
                setErrorCode(error.code);
                setErrorMessage(error.message);
            });
    }

    return(
       <div>
            <p>Login</p>
            <input 
                type={"email"} 
                placeholder="email" 
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type={"password"} 
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            {
                errorCode & errorMessage != ""
                ?
                <div style={{color: "red"}}></div>
                :
                <></>
            }
            <button onClick={e => signIn()}>Login</button>
            <Link to='/sign-up'><button>Sign Up</button></Link>
            <Link to='/sign-up'>I forgot my password...</Link>
        </div> 
    )
}

export default LogIn