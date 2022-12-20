import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Root from "./screens/Root";
import Dashboard from "./screens/dashboard/Dashboard";
import Pipeline from "./screens/sales/pipeline/Pipeline";
import LoginScreen from "./screens/login/LoginScreen";
import {ErrorPage} from "./screens/components/ErrorPage";
import ChangePassword from "./screens/settings/change-password/ChangePassword";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard/>,
                },
                {
                    path: "/pipeline",
                    element: <Pipeline/>
                },
                {
                    path: "/change-password",
                    element: <ChangePassword/>
                }
            ]
        },
        {
            path: "/login",
            element: <LoginScreen/>
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
