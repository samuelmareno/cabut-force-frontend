import React, {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import auth from "../../apis/auth";
import {encrypt} from "../../util/crypto";
import suspend from "../../util/suspend";
import useLocalStorage from "../../hooks/useLocalStorage";

type JwtToken = {
    token: string;
}

const LoginScreen = () => {
    const {currentState, setCurrentState} = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [webResponse, axiosFetch] = useAxiosFunction();
    const [jwtToken, setJwtToken] = useLocalStorage('jwt', '');
    const navigate = useNavigate()

    const login = () => {
        axiosFetch({
            axiosInstance: auth,
            method: "POST",
            url: "/login",
            data: {
                email: email,
                password: password
            },
        }).then();
    }

    useEffect(() => {
        if (jwtToken) {
            navigate("/dashboard");
        }

        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (webResponse) {
            const handleResponse = async () => {
                const objectWebResponse: JwtToken = webResponse.data;
                let token = objectWebResponse.token;
                if (token) {
                    token = encrypt(token);
                    setJwtToken(token);
                    setCurrentState({...currentState, "isLoggedIn": true});
                    await suspend(1000);
                }
            }
            handleResponse().then(() => {
                navigate("/dashboard");
            });
        }
        // eslint-disable-next-line
    }, [webResponse]);

    return (
        <section className="bg-gray-50">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div className="mb-6 flex flex-row items-center text-2xl font-semibold text-gray-900">
                    <img
                        alt="logo"
                        className="mr-2 h-8 w-8"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    />
                    <h2 className="font-bold">CABUT FORCE</h2>
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
                        <form action="#" className="space-y-4 md:space-y-6">
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@bankjateng.co.id"
                                    required={true}
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
                                    required={true}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                />
                            </div>
                            <button
                                className="w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4
                    focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                id="loginButton"
                                type="button"
                                onClick={(event) => {
                                    login();
                                    event.preventDefault();
                                }}
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginScreen;
