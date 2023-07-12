import { useCallback, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const signOut = useSignOut();

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(!isSidebarOpen);
    }, [isSidebarOpen]);

    return (
        <div className="flex h-screen bg-gray-200">
            <div className={`${isSidebarOpen ? "block" : "hidden"} bg-gray-800 text-white w-64 sm:block`}>
                <div className="md:flex md:items-center md:justify-between h-16 hidden">
                    <h1 className="text-2xl font-bold">Logo</h1>
                </div>
                <ul className="py-4">
                    <li>
                        <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-700" onClick={toggleSidebar}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <button className="block px-4 py-2 text-sm hover:bg-gray-700" onClick={signOut()}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between h-16 bg-gray-800 md:hidden">
                    <button className="text-white px-4 py-2 sm:hidden" onClick={toggleSidebar}>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isSidebarOpen ? <path fillRule="evenodd" clipRule="evenodd" d="M19 5H5v2h14V5zm0 6H5v2h14v-2zm0 6H5v2h14v-2z" /> : <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16V4H4v2zm0 5h16v-2H4v2zm0 5h16v-2H4v2z" />}
                        </svg>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Logo</h1>
                    <div></div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
