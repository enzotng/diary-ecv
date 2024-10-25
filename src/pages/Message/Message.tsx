import React, { useState } from "react";
import { useJournal } from "../../utils/JournalContext";

interface MessageProps {
    id: string;
}

const Message: React.FC<MessageProps> = ({ id }) => {
    const { messages, updateMessage, deleteMessage, decryptMessage } =
        useJournal();
    const message = messages.find((msg) => msg.id === id);
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isDecrypted, setIsDecrypted] = useState(false);

    if (!message) return null;

    const handleDecrypt = () => {
        const decryptedContent = decryptMessage(id, password);
        if (decryptedContent !== null) {
            setContent(decryptedContent);
            setIsDecrypted(true);
        } else {
            alert("Mot de passe incorrect !");
        }
    };

    const handleUpdate = () => {
        if (content && password) {
            updateMessage(id, content, password);
            setIsEditing(false);
            setIsDecrypted(false);
        }
    };

    const handleDelete = () => deleteMessage(id);

    return (
        <div>
            {isDecrypted ? (
                <div>
                    {isEditing ? (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                    <button onClick={handleUpdate}>Mettre à jour</button>
                </div>
            ) : (
                <>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleDecrypt}>Voir le message</button>
                </>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Annuler" : "Modifier"}
            </button>
            <button onClick={handleDelete}>Supprimer</button>
        </div>
    );
};

export default Message;
