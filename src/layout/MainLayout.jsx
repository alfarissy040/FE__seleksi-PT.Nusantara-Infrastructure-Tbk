import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle, HiOutlineHome } from "react-icons/hi2";
import useCookie from "../hook/useCookie";
import axios from "axios";
import { baseUrl } from "../helper";
import { toast } from "react-hot-toast";

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [token, setToken] = useCookie("token", null);
    const navigation = useNavigate();

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(!isSidebarOpen);
    }, [isSidebarOpen]);

    const signOut = () => {
        const url = baseUrl + "/api/user/logout";
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };

        axios
            .delete(url, { headers })
            .then(() => {
                setToken(token, { expires: 0 });
                navigation("/login");
            })
            .catch(({ response: res }) => {
                if (res.status === 401) {
                    navigation("/login");
                    return toast.error("User is unauthenticated!");
                }
                if (res.status === 500) {
                    return toast.error("Server Error!");
                }
                return toast.error("Something went wrong!");
            });
    };

    useEffect(() => {
        if (!token) {
            navigation("/login");
        }
    }, [token]);

    return (
        <div className="flex h-screen bg-gray-200">
            <div className={`${isSidebarOpen ? "block" : "hidden"} bg-gray-800 text-white w-64 sm:block`}>
                <div className="sm:flex sm:items-center sm:justify-center h-16 hidden">
                    <h1 className="text-3xl font-bold ">MyBook</h1>
                </div>
                <ul className="py-4">
                    <li>
                        <Link to="/" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-700" onClick={toggleSidebar}>
                            <HiOutlineHome className="w-5 h-5 text-white" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <button className="flex items-center text-start gap-3 px-4 py-2 text-sm hover:bg-gray-700 w-full" onClick={() => signOut()}>
                            <HiArrowRightOnRectangle className="w-5 h-5 text-white" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col flex-1 h-screen overflow-auto">
                <div className="flex items-center justify-between h-16 bg-gray-800 sm:hidden">
                    <button className="text-white px-4 py-2 sm:hidden" onClick={toggleSidebar}>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isSidebarOpen ? <path fillRule="evenodd" clipRule="evenodd" d="M19 5H5v2h14V5zm0 6H5v2h14v-2zm0 6H5v2h14v-2z" /> : <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16V4H4v2zm0 5h16v-2H4v2zm0 5h16v-2H4v2z" />}
                        </svg>
                    </button>
                    <h1 className="text-2xl font-bold text-white">MyBook</h1>
                    <div></div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
