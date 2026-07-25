import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function EventCard() {
  const navigate = useNavigate()
  const [event, setEvent] = useState({
    title: "",
    date: "",
    venue: "",
    price: "",
    availableSeats: ""
  });
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/addevents", event);
    alert("Event added successfully");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px",backgroundColor:"#ffffff", border:"1px solid #ffffff",
           borderRadius:"10px",height:"340px",width:"300px" ,marginLeft:"450px",marginTop:"50px"}}>
      <h2>Add Event</h2>
      <select name="title" placeholder="Title" onChange={handleChange} required 
      style={{marginTop:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"150px"}}>
            <option value="">Select Event</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Art & Culture">Art & Culture</option>
            <option value="Professional/Education">Professional/Education</option>
            <option value="Sports & Fitness">Sports & Fitness</option>
            <option value="College/Social">College/Social</option>
            <option value="Community/Others">Community/Others</option>
           </select>
      <br />
      <input type="date" name="date" onChange={handleChange} required 
      style={{marginTop:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"150px"}}/>
      <br />
      <input name="venue" placeholder="Venue" onChange={handleChange} required 
      style={{marginTop:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"150px"}}/>
      <br />
      <input name="price" placeholder="Price" onChange={handleChange} required 
      style={{marginTop:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"150px"}}/>
      <br />
      <input
        name="availableSeats"
        placeholder="Available Seats"
        onChange={handleChange}
        required
        style={{marginTop:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"40px",width:"150px"}}
      />
      <br /><br />
      <button type="submit" style={{marginTop:"10px", backgroundColor:"#0d6efd", border:"1px solid #0d6efd",
           borderRadius:"5px",height:"30px",width:"150px"}}>Add Event</button>
    </form>
  );
}