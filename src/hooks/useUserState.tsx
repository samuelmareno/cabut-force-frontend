import {useEffect, useState} from "react";
import useAxiosFunction from "./useAxiosFunction";
import users from "../apis/users";
import useLocalStorage from "./useLocalStorage";
import {useNavigate} from "react-router-dom";

type UserState = {
    isLoggedIn: boolean;
    id: string;
    name: string;
    username: string;
    role: string;
    lastLogin: number | null;
    createdAt: number;
}

const useUserState = () => {
    const [userState, setUserState] = useState<UserState>({} as UserState);
    const [jwt, setJwt] = useLocalStorage('jwt', '');
    const {webResponse, axiosFetch, error} = useAxiosFunction<UserState>();
    const navigate = useNavigate();

    useEffect(() => {
            try {
                axiosFetch({
                    axiosInstance: users(jwt),
                    method: "GET",
                    url: "/",
                }).then()
            } catch (exception) {
                if (exception instanceof Error && exception.message === "Malformed UTF-8 data") {
                    setJwt("");
                }
            }
            // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (error === "Request failed with status code 401") {
            setJwt("");
        }

        // eslint-disable-next-line
    }, [error])


    useEffect(() => {
        if (webResponse) {
            const objectWebResponse: UserState = webResponse.data;
            setUserState({...objectWebResponse, isLoggedIn: true});
        }
    }, [webResponse]);

    useEffect(() => {
        if (!jwt) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [jwt])


    return userState;
}

export default useUserState;