import { createContext, useContext, useState } from 'react';
import { auth, onAuthStateChanged } from '../services/firebase';

const authUserContext = createContext();

export default function useAuth() {
	return useContext(authUserContext);
}

export function AuthUserProvider({ children }) {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      console.log("context changed, logged in")
    } else {
      setUser(null);
      console.log("context changed, logged out")
    }
  });

  // const login = async () => {
	// 	const { error, user } = await AuthService.loginWithGoogle();
	// 	setUser(user ?? null);
	// 	setError(error ?? "");
	// };

	// const logout = async () => {
	// 	await signOut(auth).logout();
	// 	setUser(null);
	// };

  const value = { user, onAuthStateChanged, setUser };

  return <authUserContext.Provider value={value}>{children}</authUserContext.Provider>;
}