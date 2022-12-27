import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../utils/firebase";
import { Link } from "react-router-dom";

const LogIn = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorCode, setErrorCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        console.log(errorCode, errorMessage)
    }, [errorMessage])

    const signIn = () => {
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                console.log('logged in')
            })
            .catch((error) => {
                console.log('error')
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
            <button onClick={e => signIn()}>Login</button>
            <button>Sign Up</button>
            <Link to='/signup'>I forgot my password...</Link>
        </div> 
    )
}

export default LogIn