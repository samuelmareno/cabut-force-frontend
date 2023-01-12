import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import auth from "../../apis/auth";
import {encrypt} from "../../util/crypto";
import useLocalStorage from "../../hooks/useLocalStorage";

type JwtToken = {
    token: string;
}

type UiState = {
    email: string;
    password: string;
    errorMessage: string;
}

const LoginPage = () => {
    const [uiState, setUiState] = useState<UiState>({email: "", errorMessage: "", password: ""});
    const {webResponse, axiosFetch, loading, error} = useAxiosFunction<JwtToken>();
    const [jwtToken, setJwtToken] = useLocalStorage('jwt', '');
    const navigate = useNavigate()

    const handleEvent = (key: keyof UiState, value: any) => {
        setUiState({...uiState, [key]: value});
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleEvent("errorMessage", "");
        if (uiState.email === "") {
            handleEvent("errorMessage", "Email tidak boleh kosong");
            return;
        }
        if (uiState.password === "") {
            handleEvent("errorMessage", "Password tidak boleh kosong");
            return;
        }
        login();
    }

    const login = () => {
        axiosFetch({
            axiosInstance: auth,
            method: "POST",
            url: "/login",
            data: {
                email: uiState.email,
                password: uiState.password
            },
        }).then();
    }

    useEffect(() => {
        if (jwtToken) {
            navigate("/dashboard");
        }
        // eslint-disable-next-line
    }, [jwtToken]);

    useEffect(() => {
        if (error) {
            handleEvent("errorMessage", error.response.data.data);
        }

        // eslint-disable-next-line
    }, [error]);

    useEffect(() => {
        if (webResponse) {
            const objectWebResponse: JwtToken = webResponse.data;
            let token = objectWebResponse.token;
            if (token) {
                token = encrypt(token);
                setJwtToken(token);
            }
        }
        // eslint-disable-next-line
    }, [webResponse]);

    return (
        <div
            className="bg-gray-50 mx-auto flex flex-col items-center justify-center px-6 py-8 h-screen lg:py-0 min-h-[320px] overflow-x-auto">
            <div
                className="text-center mb-4 flex flex-row items-center text-xl sm:text-2xl font-semibold text-gray-900">
                <img
                    alt="logo"
                    className="mr-2 h-8 w-8"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                />
                <h2 className="font-bold">CABUT
                    FORCE {process.env.NODE_ENV === "development" && process.env.NODE_ENV}</h2>
            </div>
            <div
                className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
            >
                <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            alt="Bank Jateng Logo"
                            className="flex items-center"
                            src="https://upload.wikimedia.org/wikipedia/id/c/c4/Bank_Jateng_logo.svg"
                        />
                    </div>
                    <form onSubmit={(event) => handleLogin(event)} className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                className="mb-2 block text-sm font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Your email
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                id="email"
                                name="email"
                                value={uiState.email}
                                onChange={(e) => handleEvent("email", e.currentTarget.value)}
                                placeholder="name@bankjateng.co.id"
                                type="text"
                            />
                        </div>
                        <div>
                            <label
                                className="mb-2 block text-sm font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={(e) => handleEvent("password", e.currentTarget.value)}
                                type="password"
                            />
                            <p className="text-red-600 font-medium text-sm text-center mt-2">{uiState.errorMessage}</p>
                        </div>
                        <button
                            disabled={loading}
                            className="w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4
                    focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            id="loginButton"
                            type="submit"
                        >
                            {loading ? (<>
                                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"/>
                                </svg>
                                Loading...</>) : <>Login</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
