import { createBrowserRouter } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import MainLayout from "./layout/MainLayout";
import { AuthLoader, GuestLoader } from "./loader";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        loader: GuestLoader,
    },
    {
        path: "/register",
        element: <Register />,
        loader: GuestLoader,
    },
    {
        path: "/",
        element: <MainLayout />,
        loader: AuthLoader,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
]);
