import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { Navigate } from "react-router-dom";
import axios from "axios";
export default function EventCard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
   useEffect(() => {
    fetch(`${API_URL}/eventlist`)
      .then(res => res.json())
      .then(data => setEvents(data))
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
      <h2>All Events</h2>
      {events.length === 0 ? (<p>No Events found</p>):(events.map((event)=>(
        <div key={event._id} style={{padding:"20px",marginBottom:"10px",
        display:"inline-block",height:"330px",width:"300px",gap:"10px",margin:"20px"
        ,backgroundColor:"#fff",borderRadius:"5px"}}>
         
          <div>
             <img  src={getEventImage(event.title)} alt={event.title} style={{height:"180px",width:"100%",objectFit:"cover"}}/>
             <h3>{event.title }</h3>
          <p>Date: {event.date}</p>
         <p>Venue: {event.venue}</p>
         <p>Available Seats: {event.availableSeats}</p>
        <p>Price: ₹{event.price}</p>
       
          </div>
          
        </div>
      )))}
      </div>
  )
}


