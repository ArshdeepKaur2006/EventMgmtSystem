import React from 'react'
import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const MyBookings = () => {
  const navigate = useNavigate();
   const [bookings, setbooking] = useState([]);
   const user = JSON.parse(localStorage.getItem("user"));
   console.log(user);
  useEffect(() => {
    if(!user){
      navigate("/login");
      return;
     }
    fetch(`${API_URL}/bookings/user/${user._id}`)
      .then(res => res.json())
      .then(data => setbooking(data))
      .catch(err => console.log(err));
  }, []);

  const getEventImage = (title) =>{
   if(title === "Entertainment"){
    return "/MusicFest.jpg";
  }
  else if(title === "Art & Culture"){
    return "/ArtExhibition.jpg";
  }
  else if(title === "Professional/Education"){
    return "/BusinessWorkshop.jpg";
  }
  else if(title === "Sports & Fitness"){
    return "/sports.png";
  }
  else if(title === "College/Social"){
    return "/social.jpg";
  }
  else if(title === "Community/Others"){
    return "/community.jpg";
  }
 }
  const cancelBooking = async(id) =>{
    await axios.delete(`http://localhost:5000/api/bookings/${id}`);
    window.location.reload();
  }

  return (

    <div style={{ padding: "10px" ,width:"1200px"}}>
      <h2>My Booking </h2>
      {bookings.length === 0 ? (<p>No bookings found</p>):(bookings.map((booking)=>{
      const isDeleted = booking.eventId === null;
      return (  
        <div key={booking._id} style={{padding:"20px",marginBottom:"10px", display:"inline-block",height:"400px",width:"300px",gap:"10px",margin:"20px"
        ,backgroundColor:isDeleted?"#e86c6c":"#fff",borderRadius:"5px"}}>
           <img  src={getEventImage(booking.eventName)} alt={booking.eventName} style={{height:"180px",width:"100%",objectFit:"cover"}}/>
           <h4 style={{fontSize:"24px"}}>{booking.eventName}</h4>
          <p>Date: {booking.date}</p>
          <p>Venue: {booking.venue}</p>
          <p>Total Amount: {booking.totalAmount}</p>
           {!isDeleted && <h2 style={{color:'green'}}>{booking.status}</h2>}
           {isDeleted && <h2 style={{color:'red'}}>Event has Deleted</h2>}

            <button style={{margin:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"120px"}}
           onClick={()=>cancelBooking(booking._id)}
           >Cancel Booking</button>

        </div>
      )}))}
    </div>
    
  )
}

export default MyBookings