import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Root from "./screens/Root";
import DashboardPage from "./screens/dashboard/DashboardPage";
import PipelinePage from "./screens/sales/pipeline/PipelinePage";
import LoginPage from "./screens/login/LoginPage";
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
                    element: <DashboardPage/>,
                },
                {
                    path: "/pipeline",
                    element: <PipelinePage/>
                },
                {
                    path: "/change-password",
                    element: <ChangePassword/>
                }
            ]
        },
        {
            path: "/login",
            element: <LoginPage/>
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
