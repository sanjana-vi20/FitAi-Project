import Exercise from "../models/exerciseModel.js";

export const postExercises = async (req, res, next) => {
  try {
    const {
      exerciseName,
      exerciseType,
      activities,
      experienceLevel,
      activityLevel,
    } = req.body;

    if (
      !exerciseName ||
      !exerciseType ||
      !activities ||
      !experienceLevel ||
      !activityLevel
    ) {
      
        const error = new Error("All Fields Required");
        error.statusCode = 400;
        return next(error);
      
    }

    const newExercise = await Exercise.create({
      exerciseName,
      exerciseType,
      activities,
      experienceLevel,
      activityLevel,
    });

    res.json({ message: "Exersise Feed Successfully" });
    
  } catch (error) {
    next(error);
  }
};
