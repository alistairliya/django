import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  
    //const { user } = 
    const user_obj = useAuth();
    console.log("user is: " + user_obj)
    if (!user_obj) {
        console.log("Not logged in!")
        // user is not authenticated
       // return <Navigate to="/login" />;
    }
    return children;
};