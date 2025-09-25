import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import { sendEmail } from "../middleware/sendMail.js";
import User from "../models/userModel.js";

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { name, date, time, description } = req.body;

  req.user.score = req.user.score + 100;
  // console.log(req.user.score);

  let createScoreUpdate = await User.findByIdAndUpdate(
    req.user._id,
    {
      score: req.user.score,
    },
    { new: true }
  );

  const event = new Event({
    organizer: req.user._id,
    name,
    date,
    time,
    description,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).populate("organizer", "fullName");
  res.json(events);
});

// @desc    Get a specific event
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "organizer",
    "fullName"
  );

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Delete a specific event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    if (event.organizer.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized as event organizer");
    }
    await event.remove();
    res.json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

const applyEventController = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  let email = req.user.email;
  req.user.score = req.user.score + 20;
  console.log(req.user.score);

  let scoreUpdate = await User.findByIdAndUpdate(
    req.user._id,
    {
      score: req.user.score,
    },
    { new: true }
  );
  // console.log(scoreUpdate);

  await sendEmail({
    from: "AppliedEvent <kharelbaibhav7@gmail.com>",
    to: [email],
    subject: "Applying to Event Successful",
    html: `<h1>You have succesfully applied for event on Socianity</h1>
    <p>Click on the link below to view details of the event...</p>
    <a href="http://localhost:5173/events/${req.params.id}">
    click here To view details</a>
    `,
  });

  res.json({ message: "Applied successfully" });
});

export {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  applyEventController,
};
