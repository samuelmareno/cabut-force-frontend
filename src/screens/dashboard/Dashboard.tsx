import React, {useEffect} from "react";
import axios from "axios"
import {UserState, useStateContext} from "../../contexts/ContextProvider";
import WebResponse from "../../util/WebResponse";
import {decrypt} from "../../util/crypto";

const Dashboard = () => {

    const {setCurrentState, jwt} = useStateContext();

    useEffect(() => {
        const token = decrypt(jwt);

        async function fetchUser() {
            try {
                const response = await axios.get("api/v1/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const webResponse: WebResponse<UserState> = await response.data;
                setCurrentState((prevState) => ({...prevState, ...webResponse.data}));

            } catch (e) {
                console.error("axios get user", e);
            }
        }

        //fetchUser();
    }, []);


    return <div>Dashboard</div>;
};

export default Dashboard;