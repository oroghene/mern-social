import React from 'react';
import { useRef } from 'react';
import "./Login.css";
import { loginCall } from '../../apiCalls';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import {CircularProgress} from "@material-ui/core"

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value}, dispatch);
  }
  console.log(user);
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">notLinkedIn</h3>
          <span className="loginDesc">No profile pictures</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' className="loginInput" required ref={email} />
            <input type="password" placeholder='Password' className="loginInput" required minLength={6} ref={password} />
            <button className="loginButton" type='submit' disabled={isFetching}>
              {isFetching ? <CircularProgress color='secondary' size="25px" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" type='submit'>
              {isFetching ? <CircularProgress color='white' size="25px" /> : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
