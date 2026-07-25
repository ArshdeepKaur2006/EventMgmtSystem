import React from 'react'
import { useState } from 'react'
import { API_URL } from "../api";
const Register = () => {
   const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Registered successfully");
  };
  return (
    <div>
       <div style={{height:"500px",width:"1200px", display:"flex",justifyContent:"center", alignItems:"center"}}>
        <div className='bgReg'>
        <h3 className='hReg'>Register</h3>
        <p className='uReg'>Username</p>
        <input className='inuReg' type='text' placeholder='Username' onChange={e => setForm({...form, name: e.target.value})}/>
        <p className='eLogin'>Email</p>
        <input className='ineReg' type='email' placeholder='Email' onChange={e => setForm({...form, email: e.target.value})}/>
        <p className='pReg'>Password</p>
        <input className='inpReg' type='password' placeholder='Password' onChange={e => setForm({...form, password: e.target.value})}/><br/>
        <button className='btReg' onClick={handleSubmit}>Register</button>
        <p className='noReg'>Already have an account? <a className='aLogin' href='/login'>Login</a></p>
      </div>
       </div>

    </div>

    
  )
}

export default Register
