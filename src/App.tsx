import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Journal } from "./pages/Journal";

const App: React.FC = () => {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<Journal />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
