import React from "react";

export default function Navbar({expanded, handleClick}) {
        return (
            <nav className="bg-primary-600 p-4">
                <div className="flex flex-row justify-between items-center w-full text-white text-4xl">
                    <div className="flex flex-row items-center justify-center">
                        <a className='flex font-bold text-3xl items-center justify-center rounded-full cursor-pointer material-symbols-rounded duration-300 h-12 w-12 hover:bg-blue-700'
                           onClick={handleClick}>
                            {expanded ? 'close' : 'menu'}
                        </a>
                        <h1 className="ml-2 text-2xl font-semibold">Cabut Force</h1>
                    </div>
                    <div
                        className="flex flex-row hover:bg-blue-700 p-3 rounded-full items-center justify-center text-white text-xl font-semibold cursor-pointer duration-300">
                        <p className="hidden sm:flex sm:mr-4">Samuel Mareno</p>
                        <img
                            src="https://thumbs.dreamstime.com/b/person-icon-flat-style-man-symbol-person-icon-flat-style-man-symbol-isolated-white-background-simple-people-abstract-icon-118611127.jpg"
                            alt="Profile Picture"
                            className="rounded-full h-9 w-9"/>
                    </div>
                </div>
            </nav>
        );
}