import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { secretKey } from "../constant/constant.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const createUserController = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    age,
    profession,
    // additionalDescription,
    // majorProblem,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    age,
    // majorProblem,
    profession,
    // additionalDescription,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      profession: user.profession,
      score: user.score,
      additionalDescription: user.additionalDescription,
      majorProblem: user.majorProblem,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const descriptionController = asyncHandler(async (req, res) => {
  // let token;

  // Check if token is available in headers or local storage
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  //     token = req.headers.authorization.split(" ")[1];
  //   } else if (req.cookies.token) {
  //     token = req.cookies.token;
  //   } else {
  //     res.status(401);
  //     throw new Error("Not authorized, no tokenn");
  //   }
  //   console.log("first")
  // )
  //   try {
  //     const decoded = jwt.verify(token, secretKey);
  //     req.user = await User.findById(decoded.id).select("-password");
  //     console.log(req.user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(401);
  //     // throw new Error("Not authorized, token failed");
  //     throw new Error(error.message);
  //   }

  const { additionalDescription, majorProblem } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.additionalDescription =
      additionalDescription || user.additionalDescription;
    user.majorProblem = majorProblem || user.majorProblem;
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      profession: user.profession,
      score: user.score,
      additionalDescription: user.additionalDescription,
      majorProblem: user.majorProblem,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfileController = asyncHandler(async (req, res) => {
  let token;
  // console.log(secretKey);
  // console.log(req.headers.authorization);

  // Check if token is available in headers or local storage
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = await User.findById(decoded.id).select("-password");

    if (req.user) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        age: req.user.age,
        profession: req.user.profession,
        score: req.user.score,
        additionalDescription: req.user.additionalDescription,
        majorProblem: req.user.majorProblem,
        stutterLevel: req.user.stutterLevel,
        journals: req.user.journals,
        gratitude: req.user.gratitude,
        meditation: req.user.meditation,
        myTomorrow: req.user.myTomorrow,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      profession: user.profession,
      score: user.score,
      majorProblem: user.majorProblem,
      additionalDescription: user.additionalDescription,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Update major problem
// @route   PUT /api/users/major-problem
// @access  Private
export const updateMajorProblemController = asyncHandler(async (req, res) => {
  const { majorProblem } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.majorProblem = majorProblem || user.majorProblem;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      profession: updatedUser.profession,
      score: updatedUser.score,
      majorProblem: updatedUser.majorProblem,
      additionalDescription: updatedUser.additionalDescription,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update stutter level
// @route   PUT /api/users/stutter-level
// @access  Private
export const updateStutterLevelController = asyncHandler(async (req, res) => {
  const { stutterLevel } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.stutterLevel = stutterLevel || user.stutterLevel;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      profession: updatedUser.profession,
      score: updatedUser.score,
      stutterLevel: updatedUser.stutterLevel,
      additionalDescription: updatedUser.additionalDescription,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Add journal entry
// @route   POST /api/users/journals
// @access  Private
export const addJournalController = asyncHandler(async (req, res) => {
  const { journal } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.journals.push(journal);

    await user.save();

    res.status(201).json({
      message: "Journal entry added",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Read all journal entries
// @route   GET /api/users/journals
// @access  Private
export const readJournalController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user.journals);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Add gratitude entry
// @route   POST /api/users/gratitude
// @access  Private
export const addGratitudeController = asyncHandler(async (req, res) => {
  const { gratitude } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.gratitude.push(gratitude);

    await user.save();

    res.status(201).json({
      message: "Gratitude entry added",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Read all gratitude entries
// @route   GET /api/users/gratitude
// @access  Private
export const readGratitudeController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user.gratitude);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Add my tomorrow entry
// @route   POST /api/users/my-tomorrow
// @access  Private
export const addMyTomorrowController = asyncHandler(async (req, res) => {
  const { myTomorrow } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.myTomorrow.push(myTomorrow);

    await user.save();

    res.status(201).json({
      message: "My tomorrow entry added",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUserScoreController = asyncHandler(async (req, res) => {
  const { score } = req.body;
  const user = await User.findById(req.user._id);
  let newScore = user.score + score;
  let result = await User.findByIdAndUpdate(
    req.user._id,
    { score: newScore },
    { new: true }
  );
  res.json(result);
});
// export {
//   createUserController,
//   getUserProfileController,
//   loginUserController,
//   updateMajorProblemController,
//   updateStutterLevelController,
//   addJournalController,
//   readJournalController,
//   addGratitudeController,
//   readGratitudeController,
//   addMyTomorrowController,
// };

// import asyncHandler from "express-async-handler";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import { secretKey } from "../constant/constant.js";

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, secretKey, {
//     expiresIn: "30d",
//   });
// };

// // @desc    Register a new user
// // @route   POST /api/users
// // @access  Public
// const createUserController = asyncHandler(async (req, res) => {
//   const { name, email, password, age, profession, additionalDescription } =
//     req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     age,
//     profession,
//     additionalDescription,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       age: user.age,
//       profession: user.profession,
//       score: user.score,
//       additionalDescription: user.additionalDescription,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// // @desc    Get user profile
// // @route   GET /api/users/profile
// // @access  Private
// const getUserProfileController = asyncHandler(async (req, res) => {
//   let token;
//   console.log(secretKey);
//   console.log(req.headers.authorization);

//   // Check if token is available in headers or local storage
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.token) {
//     token = req.cookies.token;
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (req.user) {
//       res.json({
//         _id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//         age: req.user.age,
//         profession: req.user.profession,
//         score: req.user.score,
//         additionalDescription: req.user.additionalDescription,
//         createdAt: req.user.createdAt,
//         updatedAt: req.user.updatedAt,
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(401);
//     throw new Error("Not authorized, token failed");
//   }
// });

// // @desc    Authenticate user and get token
// // @route   POST /api/users/login
// // @access  Public
// const loginUserController = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email }).select("+password");

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       age: user.age,
//       profession: user.profession,
//       score: user.score,
//       majorProblem: user.majorProblem,
//       additionalDescription: user.additionalDescription,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// export { createUserController, getUserProfileController, loginUserController };
