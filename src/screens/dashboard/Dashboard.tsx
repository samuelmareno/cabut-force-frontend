import React, {useEffect} from "react";
import {UserState, useStateContext} from "../../contexts/ContextProvider";
import fetchUser from "../../util/fetchUser";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

    const {setCurrentState} = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser()
            .then((response: UserState) => {
                    setCurrentState((prevState) => ({...prevState, ...response}));
            })
    }, []);

    return <div>Dashboard</div>;
};

export default Dashboard;