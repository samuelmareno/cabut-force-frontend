import {useEffect, useState} from "react";
import WebResponse from "../util/web-response";
import {useNavigate} from "react-router-dom";
import updateLogger from "../util/update-logger";

type AxiosConfigObject = {
    axiosInstance: any,
    method: string,
    url: string,
    data?: object,
    requestConfig?: object
}

function useAxiosFunction<T>() {
    const [webResponse, setWebResponse] = useState<WebResponse<T>>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [controller, setController] = useState<AbortController>();
    const navigate = useNavigate();

    const axiosFetch = async (configObject: AxiosConfigObject) => {
        const {
            axiosInstance,
            method,
            url,
            data,
            requestConfig = {}
        } = configObject;

        try {
            setError("");
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, data, {
                ...requestConfig,
                signal: ctrl.signal
            });
            setWebResponse(res.data);
            updateLogger(res.data);
        } catch (err: any) {
            updateLogger(err);
            if (err.response.status === 401) {
                localStorage.removeItem("jwt");
                navigate("/login");
            }
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => controller?.abort();
    }, [controller]);

    return {loading, webResponse, axiosFetch, error};
}

export default useAxiosFunction;