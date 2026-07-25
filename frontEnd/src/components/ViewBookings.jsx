import React from 'react'
import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const ViewBookings = () => {
  const navigate = useNavigate();
  
   const [bookings, setbooking] = useState([]);
   const user = JSON.parse(localStorage.getItem("user"));
   console.log(user);
  useEffect(() => {
    if(!user){
      navigate("/login");
      return;
     }
    fetch(`${API_URL}/bookings/user`)
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

  return (

    <div style={{ padding: "10px" ,width:"1200px"}}>
      <h2>All Booking </h2>
      {bookings.length === 0 ? (<p>No bookings found</p>):(bookings.map((booking)=>{
        const isDeleted = booking.eventId === null;
        return(
        
        <div key={booking._id} style={{padding:"20px",marginBottom:"10px", display:"inline-block",height:"400px",width:"340px",gap:"10px",margin:"20px"
        ,backgroundColor:isDeleted?"#e86c6c":"#fff",borderRadius:"5px"}}>
          <img  src={getEventImage(booking.eventName)} alt={booking.eventName} style={{height:"180px",width:"100%",objectFit:"cover"}}/>
           <h4 style={{fontSize:"24px"}}>{booking.eventName}</h4>
          <p>Date: {booking.date}</p>
          <p>Venue: {booking.venue}</p>
          <p>Total Amount: {booking.totalAmount}</p>
           <p><strong>Booked By: </strong>{booking.userId?.name}</p>
          <p><strong>User ID: </strong>{booking.userId?._id}</p>
          {!isDeleted && <p style={{color:'green'}}>Scheduled</p>}
          {isDeleted && <p style={{color:'red'}}>Deleted</p>}
        </div>
      )}))}
    </div>
    
  )
}

export default ViewBookings