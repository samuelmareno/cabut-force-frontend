import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./screens/components/Navbar";
import Sidebar from "./screens/components/Sidebar";
import {UserState, useStateContext} from "./contexts/ContextProvider";

import Dashboard from "./screens/dashboard/Dashboard";
import Pipeline from "./screens/sales/pipeline/Pipeline";
import ChangePassword from "./screens/settings/change-password/ChangePassword";
import LoginScreen from "./screens/login/LoginScreen";
import AddProspect from "./screens/sales/pipeline/AddProspect";
import {decrypt} from "./util/crypto";
import {useEffect} from "react";
import axios from "axios";
import WebResponse from "./util/WebResponse";

function App() {
    const {activeMenu, currentState, setCurrentState, screenSize, showAddProspect, jwt} = useStateContext();

    useEffect(() => {
        setCurrentState((prevState) => ({...prevState, isLoggedIn: jwt !== ""}));
        const token = decrypt(jwt);

        async function fetchUser() {
            try {
                const response = await axios.get("api/v1/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const webResponse: WebResponse<UserState> = await response.data;
                setCurrentState((prevState) => ({...prevState, ...webResponse.data, isLoggedIn: true}));

            } catch (e) {
                console.error("axios get user", e);
            }
        }

        fetchUser();
    }, []);

    return (
        <div className="relative w-full">
            {showAddProspect ? <AddProspect/> : <></>}
            <BrowserRouter>
                {currentState.isLoggedIn ? (
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
                                <Routes>
                                    {/* Home */}
                                    <Route path="/" element={<Dashboard/>}/>
                                    {/* Dashboard */}
                                    <Route path="/dashboard" element={<Dashboard/>}/>
                                    {/* Sales */}
                                    <Route
                                        path="/pipeline"
                                        element={<Pipeline/>}
                                    />
                                    {/* Setelan */}
                                    <Route path="/change-password" element={<ChangePassword/>}/>
                                    <Route path="/login" element={<LoginScreen/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                ) : (
                    <LoginScreen/>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
