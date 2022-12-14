import React, {useState} from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import useLocalStorage from "../../util/useLocalStorage";
import WebResponse from "../../util/WebResponse";

const LoginScreen = () => {
  const { currentState, setState } = useStateContext();

  const [jwt, setJwt] = useLocalStorage("jwt", "");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, password: password})
    }
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', requestOptions)
      const webResponse: WebResponse<any> = await response.json()
      setJwt(webResponse.data.token)
      setJwt("initoken")
      console.info(webResponse.data.token)
    } catch (e) {
        console.error(e)
    }

    setState({ ...currentState, "isLoggedIn": true });
    //window.open("/dashboard", "_self");
  }

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
