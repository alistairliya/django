
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
        protected layout
      {outlet}
    </div>
  );
};