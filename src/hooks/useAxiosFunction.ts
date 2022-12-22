import {useEffect, useState} from "react";

type AxiosConfigObject = {
    axiosInstance: any,
    method: string,
    url: string,
    data?: object,
    requestConfig: object
}

const useAxiosFunction = () => {
    const [webResponse, setWebResponse] = useState<any>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [controller, setController] = useState<AbortController>();

    const axiosFetch = async (configObject: AxiosConfigObject) => {
        const {
            axiosInstance,
            method,
            url,
            data,
            requestConfig = {}
        } = configObject;

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, data, {
                ...requestConfig,
                signal: ctrl.signal
            });
            setWebResponse(res.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => controller?.abort();
    }, [controller]);

    return [webResponse, axiosFetch, loading, error];
}

export default useAxiosFunction;