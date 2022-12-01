import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./screens/components/Navbar";
import Sidebar from "./screens/components/Sidebar";
import { useStateContext } from "./contexts/ContextProvider";

import Home from "./screens/home/Home";
import Dashboard from "./screens/dashboard/Dashboard";
import Pipeline from "./screens/sales/pipeline/Pipeline";
import ChangePassword from "./screens/settings/change-password/ChangePassword";
import LoginScreen from "./screens/login/LoginScreen";
import AddProspect from "./screens/sales/pipeline/AddProspect";

function App() {
  const { activeMenu, currentState, screenSize, showAddProspect } = useStateContext();

  return (
    <div className="w-full relative">
      {showAddProspect ? <AddProspect />: <></>}
      <BrowserRouter>
        {currentState.isLoggedIn ? (
          <div className="flex">
            <div
              className={`${
                activeMenu && screenSize < 900 ? "block" : "hidden"
              } w-screen h-screen bg-black absolute opacity-50`}
            />
            <div>
              <Sidebar />
            </div>
            <div
              className={`min-h-screen w-full bg-main-bg ${
                activeMenu ? "md:ml-72" : "flex-2"
              }`}
            >
              <div className="w-full">
                <Navbar />
              </div>

              <div className="p-4">
                <Routes>
                  {/* Home */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  {/* Dashboard */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* Sales */}
                  <Route
                    path="/pipeline"
                    element={<Pipeline />}
                  />
                  {/* Setelan */}
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/login" element={<LoginScreen />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <LoginScreen />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
