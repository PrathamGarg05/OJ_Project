import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "@headlessui/react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function NavBar() {

    const {theme, toggleTheme} = useContext(ThemeContext)

    return(
        <nav className="h-14 flex items-center justify-between px-6 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-700 text-sm font-medium shadow-sm">
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    CodeNest
                </Link>
                <Link to="/problems" className="text-gray-900 hover:text-black dark:hover:text-white dark:text-gray-300">Problems</Link>

            </div>
            <div className="flex items-center gap-4">
                <Button 
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                    className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                </Button>
                <Link to={'/register'} className="text-gray-900 hover:text-black dark:hover:text-white dark:text-gray-300">Register</Link>
                <p className="text-gray-900 dark:text-gray-300 m-0">{"or"}</p>
                <Link to={'/login' } className="text-gray-900 hover:text-black dark:hover:text-white dark:text-gray-300">Login</Link>
            </div>
        </nav>
    )
}

export default NavBar;