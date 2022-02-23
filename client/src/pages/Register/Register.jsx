import {axiosInstance} from '../../config';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import "./Register.css";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      password.current.setCustomValidity("Passwords do not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axiosInstance.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">notLinkedIn</h3>
          <span className="loginDesc">No profile pictures</span>
        </div>
        <form className="loginRight" onSubmit={handleSubmit}>
          <div className="loginBox">
            <input type="text" placeholder='Username' required ref={username} className="loginInput" />
            <input type="email" placeholder='Email' required ref={email} className="loginInput" />
            <input type="password" placeholder='Password' required ref={password} minLength='6' className="loginInput" />
            <input type="password" placeholder='Confirm Password' required ref={confirmPassword} minLength='6' className="loginInput" />
            <button className="loginButton" type='submit'>Sign Up</button>
            <button className="loginRegisterButton" type='submit'>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
