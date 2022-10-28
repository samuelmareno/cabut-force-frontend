import React from "react";
import {MenuItems, items } from "./MenuItems";
//import { Link, NavLink } from "react-router-dom";

//import { useStateContext } from "../contexts/ContextProvider";

export default function Sidebar({selectedMenu, expanded, handleClick}) {
    return (
        <div
            className={`${expanded ? 'w-72' : 'hidden'} flex static flex-col justify-between font-bold text-xl bg-primary-600 h-screen`}>
            <ul>
                {MenuItems(selectedMenu, handleClick)}
            </ul>
            <div className="p-4 flex items-center justify-evenly w-full text-white bg-blue-500 hover:bg-blue-400 cursor-pointer duration-300">
                <a href='#'>Logout</a>
                <a href='#' className="material-symbols-rounded font-bold">logout</a>
            </div>
        </div>
    );
}