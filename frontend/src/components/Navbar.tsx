import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-white font-bold text-xl flex items-center gap-2">
                            <span className="text-2xl">🏨</span>
                            <span className="hidden sm:inline">HotelHub</span>
                        </NavLink>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-1 sm:space-x-4">
                        <NavLink
                            to="/rooms"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                }`
                            }
                        >
                            <span className="flex items-center gap-1">
                                <span className="hidden sm:inline">🛏️</span> Rooms
                            </span>
                        </NavLink>

                        <NavLink
                            to="/create-room"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                }`
                            }
                        >
                            <span className="flex items-center gap-1">
                                <span className="hidden sm:inline">➕</span> Add Room
                            </span>
                        </NavLink>

                        <NavLink
                            to="/booking-summary"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                }`
                            }
                        >
                            <span className="flex items-center gap-1">
                                <span className="hidden sm:inline">📊</span> Summary
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
