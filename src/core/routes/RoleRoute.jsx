import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../auth/authUtil";


export default function RoleRoute({ allowedRoles }) {

    const userRole = getUserRole();

    if (!allowedRoles.includes(userRole)) {

        return (
            <Navigate
                to="/404"
                replace
            />
        );

    }

    return <Outlet />;
}