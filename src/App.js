
import { BrowserRouter } from "react-router-dom";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import LoginScreen from './screens/login/LoginScreen'

function App() {
    return (
    <div>
        <BrowserRouter>
        <div className="w-72 fixed sidebar bg-white">
            Sidebar
        </div>
        </BrowserRouter>
    </div>
);
}

export default App;
