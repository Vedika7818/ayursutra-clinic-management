import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role")
  });

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
