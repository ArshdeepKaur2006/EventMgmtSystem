import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../api";


const Payment = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
   useEffect(() => {
    fetch(`${API_URL}/eventlist`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);

const handleCancel = async (event) => {
  navigate("/eventlist");
}


  const handleBook = async (event) => {
  if (!user) {
    alert("Please login to book event");
    navigate("/login");
    return;
  }
  const bookingData = {
    userId: user._id,  
    eventId: event._id,     
    eventName: event.title,     
    date:event.date,
    venue: event.venue,
    totalAmount: event.price,
  };
  const res = await fetch("http://localhost:5000/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  const data = await res.json();
  if (res.ok) {
    alert("Payment Successful & Booking Confirmed");
    navigate("/mybookings");   
  } else {
    alert(data.message || "Payment failed");
  }
};
  
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
    <div style={{padding:"20px",marginBottom:"10px",
        display:"inline-block",height:"400px",width:"340px",gap:"10px",margin:"15px"
        ,backgroundColor:"#fff",borderRadius:"5px"}}>
         
          <div>
             <img  src={getEventImage(event.title)} alt={event.title} style={{height:"140px",width:"100%",objectFit:"cover"}}/>
          <div>
               <h3 style={{display:"flex",marginBottom:"7px",marginTop:"7px"}}>Payment Details</h3>
                <p style={{display:"flex"}}><p style={{color:"rgba(134, 131, 131, 0.82)"}}>Event:</p> <p style={{paddingLeft:"10px"}}></p>{event.title}</p>
                <p style={{display:"flex"}}><p style={{color:"rgba(134, 131, 131, 0.82)"}}>Date:</p> <p style={{paddingLeft:"10px"}}></p>{event.date}</p>
                <p style={{display:"flex"}}><p style={{color:"rgba(134, 131, 131, 0.82)"}}>Venue:</p> <p style={{paddingLeft:"10px"}}></p>{event.venue}</p>
                <p style={{display:"flex"}}><p style={{color:"rgba(134, 131, 131, 0.82)"}}>Total:</p> <p style={{paddingLeft:"10px"}}></p>₹{event.price}</p>
          </div><hr  style={{display:"flex",marginBottom:"8px",marginTop:"8px"}}/>
          
            <div>
                <button style={{backgroundColor:"rgba(21, 120, 36, 0.82)",color:"#fff",borderRadius:"5px",marginBottom:"3px",height:"30px",width:"100%"
                  }} onClick={()=>handleBook(event)}>Pay ₹{event.price}</button>
                <button style={{backgroundColor:"rgba(222, 225, 223, 0.82)",color:"#000000",borderRadius:"5px",height:"30px",width:"100%"}}
                onClick={()=>handleCancel(event)}>Cancel</button>
            </div>
          </div>    
        </div>
 
  )
}

export default Payment
