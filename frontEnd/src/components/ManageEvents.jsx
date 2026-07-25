import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { Navigate } from "react-router-dom";
import axios from "axios";
export default function ManageEvents() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
   useEffect(() => {
    fetch(`${API_URL}/eventlist`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);
  const deleteEvent=async(id)=>{
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    setEvents(events.filter(e=> e._id !== id));
  }

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
      <h2>Manage Events</h2>
      <div>
        <button style={{margin:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"80px"}}
           onClick={()=>navigate("/add-event")}
           >Add Event</button>
       </div>
      {events.length === 0 ? (<p>No Events found</p>):(events.map((event)=>(
        <div key={event._id} style={{padding:"20px",marginBottom:"10px",
        display:"inline-block",height:"400px",width:"300px",gap:"10px",margin:"20px"
        ,backgroundColor:"#fff",borderRadius:"5px"}}>
          <div>
             <img  src={getEventImage(event.title)} alt={event.title} style={{height:"180px",width:"100%",objectFit:"cover"}}/>
             <h3>{event.title }</h3>
          <p>Date: {event.date}</p>
         <p>Venue: {event.venue}</p>
         <p>Available Seats: {event.availableSeats}</p>
        <p>Price: ₹{event.price}</p>
      
       <button style={{margin:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"80px"}}
           onClick={()=>deleteEvent(event._id)}
           >Delete Event</button>
          </div>
          
        </div>
      )))}
      </div>
  )
}


