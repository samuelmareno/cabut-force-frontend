import React from "react";
import { items } from "./MenuItems";
import { Link, NavLink } from "react-router-dom";

import { useStateContext } from "../../contexts/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg font-semibold bg-blue-700 text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black hover:text-black hover:bg-gray-100 m-2 duration-300";

  return (
    <div
      className="ml-3 h-screen
      md:overflow-hidden overflow-auto 
      md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          <div id="Logo Brand" className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 
              mt-4 flex text-xl font-extrabold
              text-slate-900"
            >
              <div className="flex items-center text-xl font-semibold text-gray-900">
                <img
                  alt="logo"
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                />
                <span>Cabut Force</span>
              </div>
            </Link>
            <button
              id="Close Sidebar Button"
              type="button"
              onClick={() => setActiveMenu(false)}
              className="text-xl rounded-full text-black
              p-3 hover:bg-light-gray mt-4 block lg:hidden
              material-symbols-rounded"
            >
              cancel
            </button>
          </div>
          <div id="Dashboard Menu" className="mt-10">
            {items.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.url}`}
                    key={link.url}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
