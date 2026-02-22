import { makeWorkoutPlan } from "../util/helpers.js";

export const getWorkouts = async (req, res, next) => {
  try {
    const { goalOne, exLevel, actLevel } = req.body;

    if (!goalOne || !exLevel || !actLevel) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const weekTemplate = await makeWorkoutPlan(goalOne, exLevel, actLevel);

    res
      .status(200)
      .json({ message: "Exercises Successfully Fetched", data: weekTemplate });
  } catch (error) {
    next(error);
  }
};
