import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    console.log(data)
    // With User ID andd PW, get the token
    const token = await fetch('http://localhost:8000/api-token-auth/',{
        method:'POST',
        body:{
            username:'test',
            password:'test123!'
        }
    })
    console.log(token)
    // If success, store the token and navigate to sashboard.
    // Otherwise display login error.
    setUser(data);
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    console.log("Check Point 1...")
    return useContext(AuthContext);
};