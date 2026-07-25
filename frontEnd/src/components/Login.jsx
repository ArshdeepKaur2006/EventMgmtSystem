import React from 'react'
import { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

import './style.css'
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(res.ok){
       alert("Login successful");
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      navigate("/");
      console.log("logged in user:",data.user);
       console.log("username:",data.user.name);
    }else{
      alert(data.message || "Invalid login");
    }
  };

  return (
    <div >
      <div style={{height:"500px",width:"1200px", display:"flex",justifyContent:"center", alignItems:"center"}}>
        <form onSubmit={(e)=>{e.preventDefault();
          login();}
        }>
          <div className='bgLogin' >
        <h3 className='hLogin'>Login</h3>
        <p className='eLogin'>Email</p>
        <input className='ineLogin' type='email' placeholder='Email'  onChange={e => setEmail(e.target.value)}/>
        <p className='pLogin'>Password</p>
        <input className='inpLogin' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/><br/>
        <button className='btLogin' type="submit">Login</button>
        <p className='noLogin'>Dont't have an account? <a className='aLogin' href='/register'>Register</a></p>
      </div>
        </form>
      </div>
    </div>
  )
}

export default Login