import expressAsyncHandler from "express-async-handler";
import generateContent from "../service/ai2.service.js";

export const readingExerciseController = expressAsyncHandler(
  async (req, res, next) => {
    // const { prompt } = req.query;
    console.log("first");
    const prompt = req.body.prompt;
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
  }
);

export default readingExerciseController;
