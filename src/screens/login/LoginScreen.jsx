import React from "react";

class LoginScreen extends React.Component {
    render() {
        return (
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 flex-row text-2xl font-semibold text-gray-900 dark:text-white">
                        <img alt="logo" className="w-8 h-8 mr-2"
                             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"/>
                        <h2 className="font-bold">CABUT FORCE</h2>
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0
                            dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex flex-col items-center justify-center">
                                <img alt="Bank Jateng Logo"
                                     className="flex items-center"
                                     src="https://upload.wikimedia.org/wikipedia/id/c/c4/Bank_Jateng_logo.svg"/>
                            </div>
                            <form action="#" className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                           htmlFor="email">Your email</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500"
                                           id="email" name="email"
                                           placeholder="name@bankjateng.co.id"
                                           required="" type="text"/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                           htmlFor="password">Password</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500"
                                           id="password"
                                           name="password"
                                           placeholder="••••••••"
                                           required=""
                                           type="password"/>
                                </div>
                                <div className="flex w-full items-center">
                                    <div className="flex items-center">
                                        <div className="flex items-center h-5">
                                            <input aria-describedby="remember"
                                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3
                                       focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600
                                       dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                   id="remember"
                                                   type="checkbox"/>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className=" text-gray-500 dark:text-gray-300" htmlFor="remember">
                                                Remember me</label>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4
                    focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                    dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        id="loginButton" type="button">
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginScreen;