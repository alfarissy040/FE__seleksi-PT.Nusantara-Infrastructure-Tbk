import { useIsAuthenticated } from "react-auth-kit";
import { redirect } from "react-router-dom";

export const AuthLoader = () => {
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated()) {
        return redirect("/login");
    }
};

export const GuestLoader = () => {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated()) {
        return redirect("/");
    }
};
