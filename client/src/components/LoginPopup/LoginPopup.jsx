import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from "axios";
import { useStore } from '../../stores/useStore';
import { toast } from 'sonner';
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserId } = useStore();
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      setUserId(response.data.userId);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      setShowLogin(false);
      toast.success("login successful", {
        icon: '✅',
        duration: 3000,
      });
    }
    else {
      toast.error(response.data.message, {
        icon: '❌',
        duration: 3000,
      });
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>

        {currState === "Login" ? <p>Create a new account ? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account ? <span onClick={() => setCurrState("Login")}>Login here</span></p>}

      </form>
    </div>
  )
}

export default LoginPopup
