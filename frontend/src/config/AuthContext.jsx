import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("FitAIUser")) || "",
  );

  const [isLogin, setIsLogin] = useState(!!user);

  const [role, setRole] = useState(user?.role || "");

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user?.role || role);
  }, [user]);

  const value = { user, setUser, isLogin, setIsLogin, role, setRole };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

//permission granted

export const useAuth = () => {
  return useContext(AuthContext);
};
