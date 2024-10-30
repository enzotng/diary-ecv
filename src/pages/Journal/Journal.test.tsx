import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Journal from "./Journal";
import { JournalProvider } from "../../utils/JournalContext";

beforeAll(() => {
    window.confirm = jest.fn(() => true);
});

describe("Encrypted Diary Journal", () => {
    const setup = () => {
        render(
            <JournalProvider>
                <Journal />
            </JournalProvider>
        );
    };

    test("creates and encrypts a message", async () => {
        setup();
        fireEvent.change(
            screen.getByPlaceholderText("Écrire un nouveau message..."),
            {
                target: { value: "Mon message secret" },
            }
        );
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "monmotdepasse" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        await waitFor(() => {
            expect(screen.getByText(/voir le message/i)).toBeInTheDocument();
        });
    });

    test("decrypts a message with the correct password", async () => {
        setup();
        fireEvent.change(
            screen.getByPlaceholderText("Écrire un nouveau message..."),
            {
                target: { value: "Message pour déchiffrement" },
            }
        );
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "bonmotdepasse" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        await screen.findByText(/voir le message/i);
        fireEvent.click(screen.getByText(/voir le message/i));

        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "bonmotdepasse" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        await waitFor(() => {
            expect(
                screen.getByText(/message pour déchiffrement/i)
            ).toBeInTheDocument();
        });
    });

    test("fails to decrypt with an incorrect password", async () => {
        setup();
        fireEvent.change(
            screen.getByPlaceholderText("Écrire un nouveau message..."),
            {
                target: { value: "Message pour déchiffrement" },
            }
        );
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "bonmotdepasse" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        await screen.findByText(/voir le message/i);
        fireEvent.click(screen.getByText(/voir le message/i));

        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "mauvaismotdepasse" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        await waitFor(() => {
            expect(
                screen.getByText(/mot de passe incorrect/i)
            ).toBeInTheDocument();
        });
    });

    test("updates an encrypted message", async () => {
        setup();
        fireEvent.change(
            screen.getByPlaceholderText("Écrire un nouveau message..."),
            {
                target: { value: "Message initial" },
            }
        );
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "secret" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        await screen.findByText(/voir le message/i);
        fireEvent.click(screen.getByText(/voir le message/i));

        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "secret" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        fireEvent.click(screen.getByText(/modifier/i));
        fireEvent.change(
            screen.getByPlaceholderText("Écrire un nouveau message..."),
            {
                target: { value: "Message mis à jour" },
            }
        );
        fireEvent.click(screen.getByText(/sauvegarder/i));

        await waitFor(() => {
            expect(screen.getByText(/message mis à jour/i)).toBeInTheDocument();
        });
    });

    test("deletes a message after confirmation", async () => {
        setup();
        fireEvent.change(
            screen.getByPlaceholderText("Écrire un nouveau message..."),
            {
                target: { value: "Message à supprimer" },
            }
        );
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "deletepass" },
        });
        fireEvent.click(screen.getByText(/confirmer le mot de passe/i));

        await screen.findByText(/supprimer/i);
        fireEvent.click(screen.getByText(/supprimer/i));

        await waitFor(() => {
            expect(
                screen.queryByText(/message à supprimer/i)
            ).not.toBeInTheDocument();
        });
    });
});
