import express from "express";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
const router = express.Router();

router.post("/addevents", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

router.get("/eventlist", async (req, res) => {
  
  const events = await Event.find();
  res.json(events);
});

router.delete("/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({message: "Event Deleted"});
});


export default router