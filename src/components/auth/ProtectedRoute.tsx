import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";


export default function () {

    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return <Navigate to="/signin" replace />;

    return <Outlet />
}