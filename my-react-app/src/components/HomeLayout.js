import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//import { AppBar } from "./AppBar";
import {LoginPage} from "../pages/LoginPage";
export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
        home layout
        {/*outlet*/}
        <LoginPage/>
    </div>
  );
};