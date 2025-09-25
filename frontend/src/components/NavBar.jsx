import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../App";
import {
    Menu,
    X,
    Home,
    Calendar,
    HandHeart,
    Users,
    MessageSquare,
    Plus,
    LogOut,
    LogIn,
    UserPlus,
    User,
    Crown,
    Sparkles,
    ChevronDown,
    Settings,
    CreditCard,
    CircleDollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
    let global = useContext(GlobalVariableContext);
    let token = global.token;
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle click outside to close profile dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    const goToPremium = () => {
        navigate("/get-premium");
        setIsProfileOpen(false);
    };

    const handleLogout = () => {
        navigate("/logout");
        setIsProfileOpen(false);
    };

    const handleProfileClick = () => {
        navigate("/my-profile");
        setIsProfileOpen(false);
    };

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full flex items-center justify-between px-6 py-4 sticky top-0 z-50 backdrop-blur-sm ${scrolled
                ? "bg-teal-50/95 shadow-lg"
                : "bg-gradient-to-r from-teal-50 to-teal-50"
                } rounded-b-2xl transition-all duration-300`}
        >
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full opacity-0 blur-sm"></div>
                    <img
                        src="../../images/logo.png"
                        alt="Logo"
                        className="h-12 w-12 rounded-full relative shadow-lg object-cover border-2 border-white"
                    />
                </motion.div>
                <p className="text-xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent hidden sm:block">
                    Questify
                </p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 font-medium">
                {token ? (
                    <>
                        {/* Main Navigation Links */}
                        <div className="flex items-center gap-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
                                        ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                                        : "text-teal-700 hover:bg-teal-50"
                                    }`
                                }
                            >
                                <Home size={18} /> Home
                            </NavLink>
                            <NavLink
                                to="/daily-quest"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
                                        ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                                        : "text-teal-700 hover:bg-teal-50"
                                    }`
                                }
                            >
                                <Calendar size={18} /> Daily Quest
                            </NavLink>
                            <NavLink
                                to="/doctors"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
                                        ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                                        : "text-teal-700 hover:bg-teal-50"
                                    }`
                                }
                            >
                                <HandHeart size={18} /> Specialists
                            </NavLink>
                            <NavLink
                                to="/chat-ai"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
                                        ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                                        : "text-teal-700 hover:bg-teal-50"
                                    }`
                                }
                            >
                                <MessageSquare size={18} /> Just Chat
                            </NavLink>
                            <NavLink
                                to="/forum"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
                                        ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                                        : "text-teal-700 hover:bg-teal-50"
                                    }`
                                }
                            >
                                <Users size={18} /> Community
                            </NavLink>
                            <NavLink
                                to="/fundraisings"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
                                        ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                                        : "text-teal-700 hover:bg-teal-50"
                                    }`
                                }
                            >
                                <CircleDollarSign size={18} /> Fundraising
                            </NavLink>
                        </div>

                        {/* Separator */}
                        <div className="h-6 w-px bg-teal-200"></div>

                        {/* User Account Section */}
                        <div className="relative profile-dropdown">
                            <motion.button
                                onClick={toggleProfile}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-teal-700 hover:bg-teal-50 font-medium border border-teal-200 hover:border-teal-300"
                            >
                                <User size={18} />
                                <span>Account</span>
                                <motion.div
                                    animate={{ rotate: isProfileOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown size={16} />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                    >
                                        {/* Profile Section */}
                                        <div className="px-4 py-2">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Profile</p>
                                        </div>
                                        <motion.button
                                            onClick={handleProfileClick}
                                            whileHover={{ backgroundColor: "#f0fdfa" }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:text-teal-700 transition-colors"
                                        >
                                            <User size={18} />
                                            <span>My Profile</span>
                                        </motion.button>

                                        <div className="border-t border-gray-100 my-2"></div>

                                        {/* Premium Section */}
                                        <div className="px-4 py-2">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subscription</p>
                                        </div>
                                        <motion.button
                                            onClick={goToPremium}
                                            whileHover={{ backgroundColor: "#fef3c7" }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-amber-700 hover:text-amber-800 transition-colors"
                                        >
                                            <Crown size={18} />
                                            <span>Get Premium</span>
                                            <Sparkles size={14} className="ml-auto animate-pulse" />
                                        </motion.button>

                                        <div className="border-t border-gray-100 my-2"></div>

                                        {/* Account Actions */}
                                        <div className="px-4 py-2">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account</p>
                                        </div>
                                        <motion.button
                                            onClick={handleLogout}
                                            whileHover={{ backgroundColor: "#fef2f2" }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:text-red-700 transition-colors"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
                                    ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                                    : "text-teal-700 hover:bg-teal-50"
                                }`
                            }
                        >
                            <Home size={18} /> Home
                        </NavLink>

                        {/* Separator */}
                        <div className="h-6 w-px bg-teal-200"></div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <NavLink
                                    to="/register"
                                    className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
                                >
                                    <UserPlus size={18} /> Register
                                </NavLink>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <NavLink
                                    to="/login"
                                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 shadow-md"
                                >
                                    <LogIn size={18} /> Login
                                </NavLink>
                            </motion.div>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
                <motion.button
                    onClick={toggleMenu}
                    className="text-teal-700 focus:outline-none p-2 rounded-xl hover:bg-teal-100 transition-all"
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-20 left-0 w-full bg-white p-4 shadow-xl rounded-b-2xl flex flex-col items-center space-y-2 md:hidden z-40"
                    >
                        {token ? (
                            <>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
                                            ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
                                            : "hover:bg-teal-50 text-teal-700"
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    <Home size={20} /> Home
                                </NavLink>
                                <NavLink
                                    to="/daily-quest"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
                                            ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
                                            : "hover:bg-teal-50 text-teal-700"
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    <Calendar size={20} /> Daily Quest
                                </NavLink>
                                <NavLink
                                    to="/doctors"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
                                            ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
                                            : "hover:bg-teal-50 text-teal-700"
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    <HandHeart size={20} /> Consult a specialist
                                </NavLink>
                                <NavLink
                                    to="/chat-ai"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
                                            ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
                                            : "hover:bg-teal-50 text-teal-700"
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    <MessageSquare size={20} /> Just Chat
                                </NavLink>
                                <NavLink
                                    to="/forum"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
                                            ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
                                            : "hover:bg-teal-50 text-teal-700"
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    <Users size={20} /> Community forum
                                </NavLink>
                                <NavLink
                                    to="/fundraisings"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
                                            ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
                                            : "hover:bg-teal-50 text-teal-700"
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    <CircleDollarSign size={20} /> Fundraising
                                </NavLink>
                                {/* Separator */}
                                <div className="w-full h-px bg-teal-200 my-2"></div>

                                {/* Account Section in Mobile Menu */}
                                <div className="w-full profile-dropdown">
                                    <motion.button
                                        onClick={toggleProfile}
                                        className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all text-teal-700 hover:bg-teal-50 border border-teal-200"
                                    >
                                        <div className="flex items-center gap-2">
                                            <User size={20} />
                                            <span className="font-medium">Account</span>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: isProfileOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown size={18} />
                                        </motion.div>
                                    </motion.button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-6 space-y-1">
                                                    {/* Profile Section */}
                                                    <div className="px-3 py-2">
                                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Profile</p>
                                                    </div>
                                                    <motion.button
                                                        onClick={() => {
                                                            handleProfileClick();
                                                            toggleMenu();
                                                        }}
                                                        whileHover={{ backgroundColor: "#f0fdfa" }}
                                                        className="w-full flex items-center gap-3 py-2 px-3 rounded-lg text-left text-gray-700 hover:text-teal-700 transition-colors"
                                                    >
                                                        <User size={18} />
                                                        <span>My Profile</span>
                                                    </motion.button>

                                                    <div className="border-t border-gray-100 my-2"></div>

                                                    {/* Premium Section */}
                                                    <div className="px-3 py-2">
                                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subscription</p>
                                                    </div>
                                                    <motion.button
                                                        onClick={() => {
                                                            goToPremium();
                                                            toggleMenu();
                                                        }}
                                                        whileHover={{ backgroundColor: "#fef3c7" }}
                                                        className="w-full flex items-center gap-3 py-2 px-3 rounded-lg text-left text-amber-700 hover:text-amber-800 transition-colors"
                                                    >
                                                        <Crown size={18} />
                                                        <span>Get Premium</span>
                                                        <Sparkles size={14} className="ml-auto animate-pulse" />
                                                    </motion.button>

                                                    <div className="border-t border-gray-100 my-2"></div>

                                                    {/* Account Actions */}
                                                    <div className="px-3 py-2">
                                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account</p>
                                                    </div>
                                                    <motion.button
                                                        onClick={() => {
                                                            handleLogout();
                                                            toggleMenu();
                                                        }}
                                                        whileHover={{ backgroundColor: "#fef2f2" }}
                                                        className="w-full flex items-center gap-3 py-2 px-3 rounded-lg text-left text-red-600 hover:text-red-700 transition-colors"
                                                    >
                                                        <LogOut size={18} />
                                                        <span>Logout</span>
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
                                            ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
                                            : "hover:bg-teal-50 text-teal-700"
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    <Home size={20} /> Home
                                </NavLink>

                                {/* Separator */}
                                <div className="w-full h-px bg-teal-200 my-2"></div>

                                {/* Auth Section */}
                                <div className="w-full space-y-3">
                                    <div className="px-4 py-2">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account</p>
                                    </div>
                                    <NavLink
                                        to="/register"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-teal-100 text-teal-700 rounded-xl font-medium hover:bg-teal-200 transition-colors"
                                        onClick={toggleMenu}
                                    >
                                        <UserPlus size={20} /> Register
                                    </NavLink>
                                    <NavLink
                                        to="/login"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-md hover:from-teal-600 hover:to-teal-700 transition-all"
                                        onClick={toggleMenu}
                                    >
                                        <LogIn size={20} /> Login
                                    </NavLink>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default NavBar;


// import React, { useContext, useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { GlobalVariableContext } from "../App";
// import {
//     Menu,
//     X,
//     Home,
//     Calendar,
//     HandHeart,
//     Users,
//     MessageSquare,
//     Plus,
//     LogOut,
//     LogIn,
//     UserPlus,
//     User,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const NavBar = () => {
//     let global = useContext(GlobalVariableContext);
//     let token = global.token;
//     const [isOpen, setIsOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);

//     // Handle scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 20);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const toggleMenu = () => setIsOpen(!isOpen);

//     return (
//         <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className={`w-full flex items-center justify-between px-6 py-4 sticky top-0 z-50 backdrop-blur-sm ${scrolled
//                 ? "bg-teal-50/95 shadow-lg"
//                 : "bg-gradient-to-r from-teal-50 to-teal-50"
//                 } rounded-b-2xl transition-all duration-300`}
//         >
//             {/* Logo and Brand Name */}
//             <div className="flex items-center gap-3">
//                 <motion.div
//                     whileHover={{ scale: 1.05, rotate: 5 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="relative"
//                 >
//                     <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full opacity-0 blur-sm"></div>
//                     <img
//                         src="../../images/logo.png"
//                         alt="Logo"
//                         className="h-12 w-12 rounded-full relative shadow-lg object-cover border-2 border-white"
//                     />
//                 </motion.div>
//                 <p className="text-xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent hidden sm:block">
//                     Questify
//                 </p>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-4 font-medium">
//                 {token ? (
//                     <>
//                         <NavLink
//                             to="/"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
//                                     ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
//                                     : "text-teal-700 hover:bg-teal-50"
//                                 }`
//                             }
//                         >
//                             <Home size={18} /> Home
//                         </NavLink>
//                         <NavLink
//                             to="/daily-quest"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
//                                     ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
//                                     : "text-teal-700 hover:bg-teal-50"
//                                 }`
//                             }
//                         >
//                             <Calendar size={18} /> Daily Quest
//                         </NavLink>
//                         <NavLink
//                             to="/doctors"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
//                                     ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
//                                     : "text-teal-700 hover:bg-teal-50"
//                                 }`
//                             }
//                         >
//                             <HandHeart size={18} /> Specialists
//                         </NavLink>
//                         <NavLink
//                             to="/chat-ai"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
//                                     ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
//                                     : "text-teal-700 hover:bg-teal-50"
//                                 }`
//                             }
//                         >
//                             <MessageSquare size={18} /> Just Chat
//                         </NavLink>
//                         <NavLink
//                             to="/forum"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
//                                     ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
//                                     : "text-teal-700 hover:bg-teal-50"
//                                 }`
//                             }
//                         >
//                             <Users size={18} /> Community
//                         </NavLink>
//                         <NavLink
//                             to="/my-profile"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
//                                     ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
//                                     : "text-teal-700 hover:bg-teal-50"
//                                 }`
//                             }
//                         >
//                             <User size={18} /> Profile
//                         </NavLink>
//                         <motion.div
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="ml-2"
//                         >
//                             <NavLink
//                                 to="/logout"
//                                 className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 shadow-md"
//                             >
//                                 <LogOut size={18} /> Logout
//                             </NavLink>
//                         </motion.div>
//                     </>
//                 ) : (
//                     <>
//                         <NavLink
//                             to="/"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive
//                                     ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
//                                     : "text-teal-700 hover:bg-teal-50"
//                                 }`
//                             }
//                         >
//                             <Home size={18} /> Home
//                         </NavLink>
//                         <motion.div
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="ml-2"
//                         >
//                             <NavLink
//                                 to="/register"
//                                 className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
//                             >
//                                 <UserPlus size={18} /> Register
//                             </NavLink>
//                         </motion.div>
//                         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                             <NavLink
//                                 to="/login"
//                                 className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 shadow-md"
//                             >
//                                 <LogIn size={18} /> Login
//                             </NavLink>
//                         </motion.div>
//                     </>
//                 )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//                 <motion.button
//                     onClick={toggleMenu}
//                     className="text-teal-700 focus:outline-none p-2 rounded-xl hover:bg-teal-100 transition-all"
//                     whileTap={{ scale: 0.9 }}
//                 >
//                     {isOpen ? <X size={24} /> : <Menu size={24} />}
//                 </motion.button>
//             </div>

//             {/* Mobile Dropdown Menu */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -20, height: 0 }}
//                         animate={{ opacity: 1, y: 0, height: "auto" }}
//                         exit={{ opacity: 0, y: -20, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="absolute top-20 left-0 w-full bg-white p-4 shadow-xl rounded-b-2xl flex flex-col items-center space-y-2 md:hidden z-40"
//                     >
//                         {token ? (
//                             <>
//                                 <NavLink
//                                     to="/"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
//                                             ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
//                                             : "hover:bg-teal-50 text-teal-700"
//                                         }`
//                                     }
//                                     onClick={toggleMenu}
//                                 >
//                                     <Home size={20} /> Home
//                                 </NavLink>
//                                 <NavLink
//                                     to="/daily-quest"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
//                                             ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
//                                             : "hover:bg-teal-50 text-teal-700"
//                                         }`
//                                     }
//                                     onClick={toggleMenu}
//                                 >
//                                     <Calendar size={20} /> Daily Quest
//                                 </NavLink>
//                                 <NavLink
//                                     to="/doctors"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
//                                             ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
//                                             : "hover:bg-teal-50 text-teal-700"
//                                         }`
//                                     }
//                                     onClick={toggleMenu}
//                                 >
//                                     <HandHeart size={20} /> Consult a specialist
//                                 </NavLink>
//                                 <NavLink
//                                     to="/chat-ai"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
//                                             ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
//                                             : "hover:bg-teal-50 text-teal-700"
//                                         }`
//                                     }
//                                     onClick={toggleMenu}
//                                 >
//                                     <MessageSquare size={20} /> Just Chat
//                                 </NavLink>
//                                 <NavLink
//                                     to="/forum"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
//                                             ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
//                                             : "hover:bg-teal-50 text-teal-700"
//                                         }`
//                                     }
//                                     onClick={toggleMenu}
//                                 >
//                                     <Users size={20} /> Community forum
//                                 </NavLink>
//                                 <NavLink
//                                     to="/my-profile"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
//                                             ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
//                                             : "hover:bg-teal-50 text-teal-700"
//                                         }`
//                                     }
//                                     onClick={toggleMenu}
//                                 >
//                                     <User size={20} /> My Profile
//                                 </NavLink>
//                                 <div className="w-full pt-2 border-t border-teal-100">
//                                     <NavLink
//                                         to="/logout"
//                                         className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-md"
//                                         onClick={toggleMenu}
//                                     >
//                                         <LogOut size={20} /> Logout
//                                     </NavLink>
//                                 </div>
//                             </>
//                         ) : (
//                             <>
//                                 <NavLink
//                                     to="/"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-2 w-full py-3 px-4 rounded-xl transition-all ${isActive
//                                             ? "bg-gradient-to-r from-teal-50 to-teal-50 text-teal-700 font-medium"
//                                             : "hover:bg-teal-50 text-teal-700"
//                                         }`
//                                     }
//                                     onClick={toggleMenu}
//                                 >
//                                     <Home size={20} /> Home
//                                 </NavLink>
//                                 <div className="w-full pt-2 space-y-3">
//                                     <NavLink
//                                         to="/register"
//                                         className="flex items-center justify-center gap-2 w-full py-3 bg-teal-100 text-teal-700 rounded-xl font-medium"
//                                         onClick={toggleMenu}
//                                     >
//                                         <UserPlus size={20} /> Register
//                                     </NavLink>
//                                     <NavLink
//                                         to="/login"
//                                         className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-md"
//                                         onClick={toggleMenu}
//                                     >
//                                         <LogIn size={20} /> Login
//                                     </NavLink>
//                                 </div>
//                             </>
//                         )}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </motion.div>
//     );
// };

// export default NavBar;
