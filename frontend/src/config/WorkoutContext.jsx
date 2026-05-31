import { createContext, useContext, useEffect, useState } from "react";

const WorkoutContext = createContext();

export const WorkoutProvider = ({children}) => {
  const [weekWorkouts, setWeekWorkouts] = useState(() => {
    const stored = localStorage.getItem("Workouts");
    return stored ? JSON.parse(stored) : [];
  });

  const [streak, setStreak] = useState([])
  // jab bhi weekWorkouts change ho → localStorage update ho
  useEffect(() => {
    localStorage.setItem("Workouts", JSON.stringify(weekWorkouts));
  }, [weekWorkouts]);

  return (
    <WorkoutContext.Provider value={{ weekWorkouts, setWeekWorkouts, streak, setStreak }}>
      {children}
    </WorkoutContext.Provider>
  );
};

//permission granted

export const useWorkout = () => {
  return useContext(WorkoutContext);
};
