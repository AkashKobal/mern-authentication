import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handelLogin = (e) => {
        e.preventDefault();
            toast.success("Login successful");
            console.log(email,password);
            navigate('/dashboard')
            
        }

    return (
        <div>
            <ToastContainer />
            <div class="form-container">
                <p class="title">Login</p>
                <form class="form">
                    
                    <div class="input-group">
                        <label for="username">Email</label>
                        <input type="email" name="username" id="username" placeholder="" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="" onChange={(e) => { setPassword(e.target.value) }} />
                        <div class="forgot">
                            <Link to='/resetpassword'>Forgot Password ?</Link>
                        </div>
                    </div>
                    <button class="sign" onClick={handelLogin}>Login</button>
                </form>
                <p class="signup">
                    Don't have an account?
                    <Link to='/signup'>Sign up</Link>
                </p>
            </div>

        </div>
    )
}

export default Login
