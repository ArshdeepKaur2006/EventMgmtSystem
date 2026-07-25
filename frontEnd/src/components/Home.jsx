import React from 'react'
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import { useState,useEffect } from 'react';

const Home = () => {
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
      <div style={{  textAlign: "center" }}>
      <div style={{backgroundColor:"#0d6efd",height:"200px"}}>
        <h1  style={{color:"white"}}>Event Management System</h1>
      <p style={{color:"white"}}>Book and manage events easily</p>

      <Link to="/login" ><button style={{backgroundColor:"#ffffff", color:"#000000", height:"30px",
        width:"100px", border:"1px solid #ffffff",borderRadius:"4px"
      }}>Login</button></Link>
      <Link to="/register"><button style={{backgroundColor:"#474747", height:"30px",margin:"10px",
        width:"120px",border:"1px solid #474747", borderRadius:"4px"}}>Register</button></Link>
      <br /><br />
      </div>
      <Link to="/eventdetails" style={{color:"#0d6efd", textDecoration:"none",margin:"4px"}}>View Events</Link>
      <div style={{display:"flex", gap:"20px",marginLeft:"130px",marginTop:"15px"}}>
        <div style={{backgroundColor:"#fff",height:"350px",width:"300px",
          borderRadius:'5px'
        }}>
             {events.length === 0 ? (<p>No Events found</p>):(events.slice(0,1).map((event)=>(
        <div key={event._id} style={{ padding:"20px", marginBottom:"10px", border:"1px soild black"
        }}>
          <img src={getEventImage(event.title)} alt={event.title} style={{height:"180px",width:"100%",objectFit:"cover"}}/>
           <h3>{event.title }</h3>
          <p>Date: {event.date}</p>
         <p>Venue: {event.venue}</p>
        <p>Available Seats: {event.availableSeats}</p>
        <p>Price: ₹{event.price}</p>
        </div>
      )))}
      
        </div>
        <div style={{backgroundColor:"#fff",height:"350px",width:"300px",borderRadius:"5px"}}>
           <div style={{backgroundColor:"#fff",height:"250px",width:"300px",borderRadius:"5px"}}>
             {events.length === 0 ? (<p>No Events found</p>):(events.slice(1,2).map((event)=>(
        <div key={event._id} style={{padding:"20px", marginBottom:"10px", border:"1px soild black"}}>
          <img src={getEventImage(event.title)} alt={event.title} style={{height:"180px",width:"100%",objectFit:"cover"}}/>
           <h3>{event.title }</h3>
          <p>Date: {event.date}</p>
         <p>Venue: {event.venue}</p>
         <p>Available Seats: {event.availableSeats}</p>
        <p>Price: ₹{event.price}</p>
        </div>
      )))}
        </div>
        </div>
        <div style={{backgroundColor:"#fff",height:"350px",width:"300px",borderRadius:"5px"}}>
           <div style={{backgroundColor:"#fff",height:"250px",width:"300px",borderRadius:"5px"}}>
             {events.length === 0 ? (<p>No Events found</p>):(events.slice(2,3).map((event)=>(
        <div key={event._id} style={{padding:"20px", marginBottom:"10px", border:"1px soild black"}}>
          <img src={getEventImage(event.title)} alt={event.title} style={{height:"180px",width:"100%",objectFit:"cover"}}/>
           <h3>{event.title }</h3>
          <p>Date: {event.date}</p>
         <p>Venue: {event.venue}</p>
         <p>Available Seats: {event.availableSeats}</p>
        <p>Price: ₹{event.price}</p>
        </div>
      )))}
      </div>
        </div>
      </div>
   </div>
    
  )
}

export default Home