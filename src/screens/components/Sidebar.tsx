import React from "react";
import {items} from "./MenuItems";
import {Link, NavLink, useNavigate} from "react-router-dom";

import {useStateContext} from "../../contexts/ContextProvider";

const Sidebar = () => {
    const {activeMenu, setActiveMenu, screenSize} = useStateContext();
    const handleCloseSidebar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false);
        }
    };
    const navigate = useNavigate();

    const activeLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg font-semibold bg-blue-700 text-white text-md m-2";
    const normalLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black hover:text-black hover:bg-gray-100 m-2";

    return (
        <div
            className={`h-screen ${activeMenu ? "w-72 fixed z-10" : "w-0 z-0"} bg-white md:overflow-hidden 
            overflow-auto md:hover:overflow-auto pb-10 duration-300`}
        >
            {activeMenu && (
                <>
                    <div id="Logo Brand" className="flex items-center justify-between">
                        <Link
                            to="/"
                            className="items-center gap-3 ml-3
              mt-4 flex text-xl font-extrabold
              text-slate-900"
                        >
                            <div className="flex items-center text-xl font-semibold text-gray-900">
                                <img
                                    alt="logo"
                                    className="mr-2 h-8 w-8"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                />
                                <span>Cabut Force</span>
                            </div>
                        </Link>
                        <button
                            id="Close Sidebar Button"
                            type="button"
                            onClick={() => setActiveMenu(false)}
                            className="text-xl rounded-full text-black p-3 hover:bg-light-gray mt-4 block lg:hidden
              material-symbols-rounded">cancel
                        </button>
                    </div>
                    <div id="Dashboard Menu" className="mt-10">
                        {items.map((item) => (
                            <div key={item.title}>
                                <p className="m-3 mt-4 uppercase text-gray-400">{item.title}</p>
                                {item.links.map((link) => (
                                    <NavLink
                                        to={`/${link.url}`}
                                        key={link.url}
                                        onClick={handleCloseSidebar}
                                        className={({isActive}) =>
                                            isActive ? activeLink : normalLink
                                        }
                                    >
                                        <span className="capitalize">{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                        <span className={`${normalLink} cursor-pointer`} onClick={() => {
                            localStorage.removeItem("jwt");
                            navigate("/login");
                        }
                        }>Logout</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
