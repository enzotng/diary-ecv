import React, { createContext, useContext, useState, ReactNode } from "react";
import CryptoJS from "crypto-js";

interface Message {
    id: string;
    content: string;
}

interface JournalContextType {
    messages: Message[];
    createMessage: (content: string, password: string) => void;
    updateMessage: (id: string, content: string, password: string) => void;
    deleteMessage: (id: string) => void;
    decryptMessage: (id: string, password: string) => string | null;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = () => {
    const context = useContext(JournalContext);
    if (!context)
        throw new Error("useJournal must be used within a JournalProvider");
    return context;
};

export const JournalProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [messages, setMessages] = useState<Message[]>(() => {
        const storedMessages = localStorage.getItem("journalMessages");
        return storedMessages ? JSON.parse(storedMessages) : [];
    });

    const saveToLocalStorage = (newMessages: Message[]) => {
        localStorage.setItem("journalMessages", JSON.stringify(newMessages));
    };

    const createMessage = (content: string, password: string) => {
        const encryptedContent = CryptoJS.AES.encrypt(
            content,
            password
        ).toString();
        const newMessage: Message = {
            id: Date.now().toString(),
            content: encryptedContent,
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        saveToLocalStorage(updatedMessages);
    };

    const updateMessage = (id: string, content: string, password: string) => {
        const encryptedContent = CryptoJS.AES.encrypt(
            content,
            password
        ).toString();
        const updatedMessages = messages.map((msg) =>
            msg.id === id ? { ...msg, content: encryptedContent } : msg
        );
        setMessages(updatedMessages);
        saveToLocalStorage(updatedMessages);
    };

    const deleteMessage = (id: string) => {
        const updatedMessages = messages.filter((msg) => msg.id !== id);
        setMessages(updatedMessages);
        saveToLocalStorage(updatedMessages);
    };

    const decryptMessage = (id: string, password: string) => {
        const message = messages.find((msg) => msg.id === id);
        if (!message) return null;
        try {
            const bytes = CryptoJS.AES.decrypt(message.content, password);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch {
            return null;
        }
    };

    return (
        <JournalContext.Provider
            value={{
                messages,
                createMessage,
                updateMessage,
                deleteMessage,
                decryptMessage,
            }}
        >
            {children}
        </JournalContext.Provider>
    );
};
