import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "@headlessui/react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

function NavBar() {

    const {theme, toggleTheme} = useContext(ThemeContext)
    const {user, userLogout} = useContext(AuthContext);
    const navigate = useNavigate();

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
                {
                    user ? (
                            <Menu as="div" className="relative inline-block text-left">
                                <MenuButton className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-800 dark:text-white">
                                    {user.username}
                                </MenuButton>

                                <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <div className="px-1 py-1">
                                        <MenuItem>
                                            {({ active }) => (
                                            <Link
                                                to="/profile"
                                                className={`${
                                                active
                                                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                                    : 'text-gray-700 dark:text-gray-200'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                My Profile
                                            </Link>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <button
                                                onClick={() => {
                                                    userLogout();
                                                    navigate('/login');
                                                }}
                                                className={`${
                                                   active
                                                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                                    : 'text-gray-700 dark:text-gray-200'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                Logout
                                                </button>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                    ) : (
                        <>
                            <Link to={'/register'} className="text-gray-900 hover:text-black dark:hover:text-white dark:text-gray-300">Register</Link>
                            <p className="text-gray-900 dark:text-gray-300 m-0">{"or"}</p>
                            <Link to={'/login' } className="text-gray-900 hover:text-black dark:hover:text-white dark:text-gray-300">Login</Link>
                        </>
                    )
                }
                <Button
                    onClick={()=> {
                        navigate('/')
                    }}
                    className={"p-2 rounded-md bg-gray-100 dark:text-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}
                >
                    Home
                </Button>
            </div>
        </nav>
    )
}

export default NavBar;