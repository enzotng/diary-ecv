import React, { useState } from "react";
import { useJournal } from "../../utils/JournalContext";
import { Message } from "../Message";

const Journal: React.FC = () => {
    const { createMessage } = useJournal();
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");

    const handleCreate = () => {
        if (content && password) {
            createMessage(content, password);
            setContent("");
            setPassword("");
        }
    };

    return (
        <div>
            <h1>Mon Journal Intime</h1>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Écrire un nouveau message..."
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
            />
            <button onClick={handleCreate}>Créer le message</button>

            <div>
                <h2>Messages</h2>
                <MessageList />
            </div>
        </div>
    );
};

const MessageList: React.FC = () => {
    const { messages } = useJournal();

    console.log(messages);
    return (
        <div>
            {messages.map((message) => (
                <Message key={message.id} id={message.id} />
            ))}
        </div>
    );
};

export default Journal;
