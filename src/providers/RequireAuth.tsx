import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
	const auth = useContext(UserContext);
	const location = useLocation();
  
	if (!auth.user.username) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
  
	return children;
  }
