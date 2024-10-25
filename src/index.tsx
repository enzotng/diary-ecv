import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { JournalProvider } from "./utils/JournalContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <JournalProvider>
        <App />
    </JournalProvider>
);