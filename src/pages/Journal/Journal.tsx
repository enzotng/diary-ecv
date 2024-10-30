import React, { useState } from "react";
import { useJournal } from "../../utils/JournalContext";
import { Message } from "../Message";
import { PasswordInput } from "../../components/PasswordInput";

const Journal: React.FC = () => {
    const { createMessage } = useJournal();
    const [content, setContent] = useState("");

    const handleCreate = (password: string) => {
        if (content && password) {
            createMessage(content, password);
            setContent("");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Mon Journal Intime</h1>
            <div className="mb-4">
                <textarea
                    className="form-control mb-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Écrire un nouveau message..."
                />
                <PasswordInput onPasswordSubmit={handleCreate} />
            </div>
            <h2>Messages</h2>
            <MessageList />
        </div>
    );
};

const MessageList: React.FC = () => {
    const { messages } = useJournal();

    return (
        <div className="mt-4">
            {messages.map((message) => (
                <Message key={message.id} id={message.id} />
            ))}
        </div>
    );
};

export default Journal;
