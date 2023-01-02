// noinspection RequiredAttributes,JSCheckFunctionSignatures

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {StateContextProvider} from "./contexts/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
// @ts-ignore
    <StateContextProvider>
        <App/>
    </StateContextProvider>
);
