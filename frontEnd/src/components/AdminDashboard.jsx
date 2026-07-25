import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { Navigate } from "react-router-dom";
import axios from "axios";
export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
   useEffect(() => {
    fetch(`${API_URL}/auth/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (
     <div style={{ padding: "10px" ,width:"1200px"}}>
      <h2>Registered Users</h2>
      {users.length === 0 ? (<p>No User found</p>):(users.map((user)=>(
        <div key={user._id} style={{padding:"5px",marginBottom:"10px",
        display:"inline-block",height:"300px",width:"320px",gap:"10px",margin:"20px"
        ,backgroundColor:"#fff",borderRadius:"5px"}}>
          <img src={`/Users.jpg`} alt={"user"} style={{height:"150px",width:"60%",objectFit:"cover"}}/>
          <div>
             <h3>Username: {user.name}</h3>
             <p>User id: {user._id}</p>
             <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
          
        </div>
      )))}
      </div>
  )
}