import { authIsLoggedIn } from "@/rtk/features/protect-routes/authSelectors";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectRoutes = ( { children }: { children: JSX.Element } ) => {
    const isLoggedIn = useSelector( authIsLoggedIn );
    const location = useLocation();

    if ( !isLoggedIn ) {
        return <Navigate to="/login" state={ { from: location } } replace />;
    }

    return children;
};