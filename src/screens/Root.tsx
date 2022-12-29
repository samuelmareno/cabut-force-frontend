import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {useStateContext} from "../contexts/ContextProvider";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Root() {
    const {activeMenu, screenSize} = useStateContext();
    const [jwtToken] = useLocalStorage('jwt', '');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!jwtToken) {
            navigate("/login");
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/dashboard");
        }
    });


    return (
        <>
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
        </>
    );
}
