import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {useStateContext} from "../contexts/ContextProvider";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Root() {

    const {activeMenu, screenSize, jwt} = useStateContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, []);


    return (
        <div className="flex">
            <div
                className={`${
                    activeMenu && screenSize < 900 ? "block" : "hidden"
                } w-screen h-screen bg-black absolute opacity-50`}
            />
            <div>
                <Sidebar/>
            </div>
            <div
                className={`min-h-screen w-full bg-main-bg ${
                    activeMenu ? "md:ml-72" : "flex-2"
                }`}
            >
                <div className="w-full">
                    <Navbar/>
                </div>

                <div className="p-4">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
