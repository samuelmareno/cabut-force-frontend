import {decrypt} from "./crypto";
import axios from "axios";
import WebResponse from "./WebResponse";
import {UserState} from "../contexts/ContextProvider";
import suspend from "./suspend";

async function fetchUser(): Promise<UserState> {
    try {
        const jwt = JSON.parse(localStorage.getItem("jwt")!!);
        const token = decrypt(jwt);

        const response = await axios.get("http://localhost:8080/api/v1/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const webResponse: WebResponse<UserState> = await response.data;
        return webResponse.data;

    } catch (error: Error | any) {

        if (error instanceof Error) {
            if (error.message === "Malformed UTF-8 data") {
                localStorage.removeItem("jwt");
                await suspend(500);
                window.location.href = "/login";
            }
        }
        return {} as UserState;
    }
}

export default fetchUser;