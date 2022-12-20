import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {useStateContext} from "./contexts/ContextProvider";
import Root from "./screens/Root";
import Dashboard from "./screens/dashboard/Dashboard";
import Pipeline from "./screens/sales/pipeline/Pipeline";
import LoginScreen from "./screens/login/LoginScreen";
import {ErrorPage} from "./screens/components/ErrorPage";


function App() {
    const {activeMenu, currentState, setCurrentState, screenSize, showAddProspect, jwt} = useStateContext();


    // useEffect(() => {
    //     setCurrentState((prevState) => ({...prevState, isLoggedIn: jwt !== ""}));
    //     const token = decrypt(jwt);
    //
    //     async function fetchUser() {
    //         try {
    //             const response = await axios.get("api/v1/users", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //
    //             const webResponse: WebResponse<UserState> = await response.data;
    //             setCurrentState((prevState) => ({...prevState, ...webResponse.data, isLoggedIn: true}));
    //
    //         } catch (e) {
    //             console.error("axios get user", e);
    //         }
    //     }
    //
    //     fetchUser();
    // }, []);

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
