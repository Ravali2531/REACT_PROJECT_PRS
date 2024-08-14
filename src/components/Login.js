import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import '../css/LoginRegister.css';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null); // Updated state to handle both error and success messages
    const [messageType, setMessageType] = useState("error"); // Track message type (error or success)
    const navigate = useNavigate();
    
    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigate("/home", { state: { email: userCredential.user.email } });
        } catch (error) {
            setMessageType("error");
            setMessage(error.message);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setMessageType("error");
            setMessage("Please enter your email address.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setMessageType("success");
            setMessage("Password reset email sent!");
        } catch (error) {
            setMessageType("error");
            setMessage(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            navigate("/home", { state: { email: result.user.email } });
        } catch (error) {
            setMessageType("error");
            setMessage(error.message);
        }
    };

    return (
        <div className='login-page'>
            <div className="lrcontainer">
                <div className="form-container">
                    <h2>Login</h2>
                    <form className="form" onSubmit={handleSignin}>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="login-btn" type="submit">Login</button>
                    </form>
                    <button className="forgetPswd" onClick={handleForgotPassword}>Forgot Password?</button>
                    <div className="links">
                        Don't have an account? Please <a href="#" onClick={() => navigate("/register")}>Register</a> here.
                    </div>
                    <button className="google-btn" onClick={handleGoogleSignIn}>
                        <img src="https://t4.ftcdn.net/jpg/03/08/54/37/360_F_308543787_DmPo1IELtKY9hG8E8GlW8KHEsRC7JiDN.jpg" alt="Google logo" /> Login with Google
                    </button>
                    {message && <div className={messageType === "success" ? "success" : "error"}>{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
