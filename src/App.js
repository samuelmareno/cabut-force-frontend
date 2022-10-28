import { BrowserRouter } from "react-router-dom";
import Navbar from "./screens/dashboard/components/Navbar";
import Sidebar from "./screens/dashboard/components/Sidebar";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import LoginScreen from "./screens/login/LoginScreen";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Sidebar />
      </BrowserRouter>
  );
}

export default App;
