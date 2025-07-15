import React, { useState, useEffect } from "react";
// import { Menu, X, Sun, Moon } from "lucide-react";
// import logo from "../../asets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    Analytics as AnalyticsIcon,
    Event as EventIcon,
    PhotoLibrary as GalleryIcon,
    People as PeopleIcon,
    Business as BusinessIcon,
    Place as PlaceIcon,
    Logout as LogoutIcon,
    VideoLibrary as VideoLibraryIcon,
} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp';
import LoginForm from "../../common/Auth/Login";
export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [darkMode, setdarkMode] = useState(true);

    let token = JSON.parse(localStorage.getItem("token"));
    let userinfo = JSON.parse(localStorage.getItem("userinfo"));

    const getNavLinkClass = (path) => {
        return `block px-3 py-2 rounded hover:bg-stone-200 hover:text-black ${location.pathname === path ? "bg-red-600" : ""
            }`;
    };

    const toggleDarkMode = () => {
        navigate("/login");
    };

    // ✅ IF not logged in or not admin, return <LoginForm />
    if (!token || !userinfo || userinfo.role !== "admin") {
        return <LoginForm />;
    }

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div
                className={`fixed z-40 inset-y-0 left-0 w-64 transform bg-black text-white border-r shadow-lg transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">Dashboard</span>
                        {/* <img src="\src\assets\Kensdrive logo.png" className="h-10" alt="" /> */}

                    </div>
                    <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
                        <CloseIcon color="white" />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li className={getNavLinkClass("/")} onClick={() => setSidebarOpen(false)}>
                            <Link to="/admin" className="flex items-center px-3 py-2 rounded hover:bg-stone-200 text-sm font-medium tracking-wide uppercase">
                                <AnalyticsIcon className="mr-3" fontSize="small" />
                                Analytics
                            </Link>
                        </li>
                        <li className={getNavLinkClass("/movies")} onClick={() => setSidebarOpen(false)}>
                            <Link to="/movies" className="flex items-center px-3 py-2 rounded hover:bg-stone-200 text-base font-semibold uppercase">
                                <MovieIcon className="mr-3" fontSize="small" />
                                movise
                            </Link>
                        </li>
                        <li className={getNavLinkClass("/Gallary")} onClick={() => setSidebarOpen(false)}>
                            <Link to="/Gallary" className="flex items-center px-3 py-2 rounded hover:bg-stone-200 text-sm font-medium tracking-wide uppercase">
                                <GalleryIcon className="mr-3" fontSize="small" />
                                Gallery
                            </Link>
                        </li>
                        <li className={getNavLinkClass("/premium")} onClick={() => setSidebarOpen(false)}>
                            <Link to="/premium" className="flex items-center px-3 py-2 rounded hover:bg-stone-200 text-sm font-medium tracking-wide uppercase">
                                <PriceChangeIcon className="mr-3" fontSize="small" />
                                primum
                            </Link>
                        </li>
                        <li className={getNavLinkClass("/order")} onClick={() => setSidebarOpen(false)}>
                            <Link to="/order" className="flex items-center px-3 py-2 rounded hover:bg-stone-200 text-sm font-medium tracking-wide uppercase">
                                <OndemandVideoSharpIcon className="mr-3" fontSize="small" />
                                Order
                            </Link>
                        </li>
                        <li className={getNavLinkClass("/trials")} onClick={() => setSidebarOpen(false)}>
                            <Link to="/trials" className="flex items-center px-3 py-2 rounded hover:bg-stone-200 text-sm font-medium tracking-wide uppercase">
                                <VideoLibraryIcon className="mr-3" fontSize="small" />
                                Trials
                            </Link>
                        </li>
                        <li className="ms-3 m-2">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("userinfo");
                                    navigate("/login");
                                }}
                                className="flex items-center w-full text-left px-3 py-2 p-20 rounded hover:bg-stone-200 text-base font-semibold uppercase"
                            >
                                <LogoutIcon className="mr-3" fontSize="small" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between bg-black text-white p-4 shadow-md border border-b-amber-50">
                    <div className="flex items-center space-x-4">
                        <button className="lg:hidden text-white" onClick={() => setSidebarOpen(true)}>
                            <MenuIcon size={24} color="white" />
                        </button>
                        <h1 className="text-lg font-semibold">Admin Panel</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {
                            userinfo?.userimage ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium capitalize text-gray-200">{userinfo.role}</span>
                                    <img
                                        className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-300"
                                        src={userinfo.userimage}
                                        alt="User"
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                >
                                    <AccountCircleIcon className="text-2xl text-gray-800 dark:text-gray-200" />
                                </button>
                            )
                        }
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 bg-black text-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
