import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';



const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handelSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password not matched");
        }
        else {
            toast.success("Registration successful");
            console.log(name,email,password);
            navigate('/login')
            
        }

    }

    return (
        <div>
            <ToastContainer />
            <div class="form-container">
                <p class="title">Sign up</p>
                <form class="form">
                    <div class="input-group">
                        <label for="username">Name</label>
                        <input type="text" name="username" id="username" placeholder="" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="input-group">
                        <label for="username">Email</label>
                        <input type="email" name="username" id="username" placeholder="" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div class="input-group">
                        <label for="password">Confirm Password</label>
                        <input type="password" name="password" id="password" placeholder="" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        <div class="forgot">
                            <Link to='/resetpassword'>Forgot Password ?</Link>
                        </div>
                    </div>
                    <button class="sign" onClick={handelSignUp}>Sign in</button>
                </form>
                <p class="signup">
                    Already have an account?
                    <Link to='/login'>Login</Link>
                </p>
            </div>

        </div>
    )
}

export default Signup
