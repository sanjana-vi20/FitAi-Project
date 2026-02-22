import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // console.log("req : " , req);

    const biscuit = req.cookies.fitAI;
    console.log("Token Recieved from cookies : ", biscuit);

    const tea = jwt.verify(biscuit, process.env.JWT_SECRET);

    console.log("Decoded value :", tea);

    if (!tea) {
      const error = new Error("Unauthorized User! Please login again...");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(tea.id);

    if (!verifiedUser) {
      const error = new Error("Unauthorized User! Please login again...");
      error.statusCode = 401;
      return next(error);
    }

    // to sent data to next that is controller;

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export const adminProtect = async (req, res, next) => {
  const currentUser = req.user;
  try {
    if (currentUser.role !== "admin") {
      const error = new Error("Unauthorized!!!");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};
