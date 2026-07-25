import express from "express";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {userId, eventId, eventName, date, venue, totalAmount} = req.body;
  const event = await Event.findById(eventId);
  if(!event){
    return res.status(400).json({message: "Event Not Found"});
  }
  if(event.availableSeats <= 0){
    return res.status(400).json({message: "No Seats available"});
  }
  event.availableSeats -= 1;
  await event.save();

  const booking = new Booking({userId, eventId, eventName, date, venue, totalAmount});
  await booking.save();
  res.status(201).json(booking);
});

router.get("/user", async (req, res) => {
  const bookings = await Booking.find().populate("userId","name")
  .populate("eventId");
  res.json(bookings);
});

router.get("/user/:userId", async (req, res) => {
  const {userId} = req.params;
  const bookings = await Booking.find({userId})
  .populate("eventId")
  .populate("userId","name");
  res.json(bookings);
});
router.delete("/:bookingId", async (req, res) => {
  const {bookingId} = req.params;
  const booking = await Booking.findById(bookingId);
  if(!booking){
    return res.status(404).json({message: "Booking not found"});
  }
  const event = await Event.findById(booking.eventId);
  if(event){
    event.availableSeats += 1;
    await event.save();
  }  
  await Booking.findByIdAndDelete(bookingId)
  res.json({message: "Booking Cancelled Successfully"});
});
export default router