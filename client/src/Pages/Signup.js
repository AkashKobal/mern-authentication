import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';



const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handelSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password not matched");
        }
        else {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password })
                .then((response) => {
                    console.log(response.data);
                    toast.success(response.data.message);
                    console.log(name, email, password);
                    navigate('/login')
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.response.data.message);
                });
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
