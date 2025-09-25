import asyncHandler from "express-async-handler";
import Fundraising from "../models/fundraisingModel.js";

// @desc    Create a new fundraising
// @route   POST /api/fundraising
// @access  Private
// @desc    Create a new fundraising
// @route   POST /api/fundraising
// @access  Private
const createFundraising = asyncHandler(async (req, res) => {
  const { title, target, phoneNumber, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!image) {
    res.status(400);
    throw new Error("Image upload is required");
  }

  const fundraising = new Fundraising({
    organizer: req.user._id,
    title,
    target,
    phoneNumber,
    description,
    image,
  });

  const createdFundraising = await fundraising.save();
  res.status(201).json(createdFundraising);
});

// @desc    Get all fundraisings
// @route   GET /api/fundraising
// @access  Public
const getAllFundraisings = asyncHandler(async (req, res) => {
  const fundraisings = await Fundraising.find({}).populate(
    "organizer",
    "fullName"
  );
  res.json(fundraisings);
});

// @desc    Get a specific fundraising
// @route   GET /api/fundraising/:id
// @access  Public
const getFundraisingById = asyncHandler(async (req, res) => {
  const fundraising = await Fundraising.findById(req.params.id).populate(
    "organizer",
    "fullName"
  );

  if (fundraising) {
    res.json(fundraising);
  } else {
    res.status(404);
    throw new Error("Fundraising not found");
  }
});

// @desc    Donate to a fundraising
// @route   POST /api/fundraising/:id/donate
// @access  Private
const donateToFundraising = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const fundraising = await Fundraising.findById(req.params.id);

  if (!fundraising) {
    res.status(404);
    throw new Error("Fundraising not found");
  }

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Valid donation amount is required");
  }

  fundraising.currentAmount += Number(amount);
  await fundraising.save();

  res.json({
    message: "Donation successful",
    currentAmount: fundraising.currentAmount,
    targetAmount: fundraising.target,
    progressPercentage: Math.round(
      (fundraising.currentAmount / fundraising.target) * 100
    ),
  });
});

export {
  createFundraising,
  getAllFundraisings,
  getFundraisingById,
  donateToFundraising,
};
