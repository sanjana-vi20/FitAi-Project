import { chatbotAI } from "../util/chatbotService.js";

export const groqChatBot = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { promp } = req.body;
    if (!currentUser || !promp) {
        const error = new Error("All Fields Required")
        error.statusCode = 400
        return next(error);
    }

    const response = await chatbotAI(promp, currentUser);

    res.json(response);

  } catch (error) {
    next(error);
  }
};
