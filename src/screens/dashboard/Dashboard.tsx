import React, {useEffect} from "react";
import {UserState, useStateContext} from "../../contexts/ContextProvider";
import fetchUser from "../../util/fetchUser";

const Dashboard = () => {

    const {setCurrentState} = useStateContext();

    useEffect(() => {
        fetchUser()
            .then((response: UserState) => {
                    setCurrentState((prevState) => ({...prevState, ...response}));
            })

        //eslint-disable-next-line
    }, []);

    return <div>Dashboard</div>;
};

export default Dashboard;