import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Navbar() {
  const navigate =  useNavigate();
  const [user, setUser] = useState(null);
  //const user = JSON.parse(localStorage.getItem("user")||"null");
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  },[])


  useEffect(()=>{
    const updateUser =()=>{
     setUser(JSON.parse(localStorage.getItem("user")));
    } ;
   window.addEventListener("storage",updateUser);
   updateUser();
   return()=>
    window.removeEventListener("storage",updateUser)
  },[]);
 
  const logout=()=>{
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }
  return (
    
    <div style={{
      padding: "15px",
      background: "#0d6efd",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      width:"1195px"
    }}>
      <h3>EventMS</h3>
      <div style={{display:"flex"}}>
        <Link style={{color:"white", margin:"10px", textDecoration:"none"}} to="/">Home</Link>
        {user && user.role === "user" && <Link style={{color:"white", margin:"10px", textDecoration:"none"}} to="/eventlist">Events</Link>}
        {user && user.role === "user" && <Link style={{color:"white", margin:"10px", textDecoration:"none"}} to="/mybookings">My Bookings</Link>}

        {user && user.role === "admin" && <Link style={{margin:"10px",color:"white", textDecoration:"none"}} to="/admin/events">Manage Events</Link>}
        {user && user.role === "admin" && <Link style={{margin:"10px",color:"white", textDecoration:"none"}}to="/admindashboard">Users</Link>}
        {user && user.role === "admin" && <Link style={{margin:"10px",color:"white", textDecoration:"none"}} to="/admin/bookings">Bookings</Link>}
        {user && user.role === "admin" && <p style={{margin:"10px"}}>Admin: {user.name}</p>}

        {!user &&<Link style={{color:"white", margin:"10px", textDecoration:"none"}} to="/login">Login</Link>}
        {user && user.role === "user" && <p style={{margin:"10px"}}>Welcome, {user.name}</p>}
        {user && <button style={{backgroundColor:"white", border:"1px solid white",margin:"10px", borderRadius:"5px",color:"blue",height:"30px",width:"50px"}} onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}