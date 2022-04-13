import { createContext, useContext, useState } from 'react';
import { auth } from "../services/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const authContextDefaultValues = {
  user: null,
  logout: () => {},
};

const AuthContext = createContext(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = () => {
    auth.signOut();
    console.log("User logged out.");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log("User logged in.")
      } else {
        setUser(null)
      }
    });
  }, []);

  const value = {
    user,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}