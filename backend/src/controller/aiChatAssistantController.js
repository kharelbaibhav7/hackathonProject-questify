import expressAsyncHandler from "express-async-handler";
import generateContent from "../service/ai.service.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../constant/constant.js";
import User from "../models/userModel.js";

export const getAiResponse = expressAsyncHandler(async (req, res, next) => {
  // const { prompt } = req.query;
  let token;

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
    console.log(req.user);
  } catch (error) {
    console.error(error);
    res.status(401);
    // throw new Error("Not authorized, token failed");
    throw new Error(error.message);
  }

  const prompt = req.user + req.body.prompt;
  //   console.log(prompt);
  if (!prompt) {
    return res
      .status(400)
      .json({ success: false, message: "Prompt is required" });
  }
  // try {
  //   const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  //   res.status(200).json({ success: true, message: result.response.text() });
  // } catch (error) {
  //   res.status(400).json({ success: false, message: error.message });
  // }

  const response = await generateContent(prompt);
  res.send(response);
});

export default getAiResponse;
