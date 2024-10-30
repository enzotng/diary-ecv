import React from "react";
import { render, screen } from "@testing-library/react";
import { JournalProvider } from "./utils/JournalContext";
import App from "./App";

test("renders the Journal page", () => {
    render(
        <JournalProvider>
            <App />
        </JournalProvider>
    );

    const titleElement = screen.getByText(/Mon Journal Intime/i);
    expect(titleElement).toBeInTheDocument();
});
