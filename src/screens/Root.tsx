import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {useStateContext} from "../contexts/ContextProvider";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Root() {
    const {activeMenu, screenWidthSize} = useStateContext();
    const [jwtToken] = useLocalStorage('jwt', '');
    const navigate = useNavigate();
    const location = useLocation();
    const {setScreenWidthSize, setScreenHeightSize, setActiveMenu} = useStateContext();

    useEffect(() => {
        const handleResize = () => {
            setScreenWidthSize(window.innerWidth);
            setScreenHeightSize(window.innerHeight);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize, false);
        };
    });

    useEffect(() => {
        if (screenWidthSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }

        // eslint-disable-next-line
    }, [screenWidthSize]);

    useEffect(() => {
        // for prevent bug when user refresh
        if (location.pathname === "/") {
            if (!jwtToken) {
                navigate("/login");
                return;
            }
            navigate("/dashboard");
        }
    });

    return (
        // for prevent dashboard screen flickering
        <>
            {jwtToken ?
                <div className="flex">
                    <div
                        className={`${
                            activeMenu && screenWidthSize < 900 ? "block" : "hidden"
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
                </div> : navigate("/login")}
        </>
    );
}
