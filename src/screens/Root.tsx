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
    const {setScreenSize, setActiveMenu} = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }

        // eslint-disable-next-line
    }, [screenSize]);

    useEffect(() => {
        if (!jwtToken) {
            navigate("/login");
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // for prevent dashboard screen flickering
        if (location.pathname === "/") {
            if (!jwtToken) {
                navigate("/login");
            }
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
