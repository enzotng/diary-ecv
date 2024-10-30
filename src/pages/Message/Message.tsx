import React, { useState } from "react";
import { useJournal } from "../../utils/JournalContext";
import { PasswordInput } from "../../components/PasswordInput";

interface MessageProps {
    id: string;
}

const Message: React.FC<MessageProps> = ({ id }) => {
    const { messages, updateMessage, deleteMessage, decryptMessage } =
        useJournal();
    const message = messages.find((msg) => msg.id === id);
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isDecrypted, setIsDecrypted] = useState(false);

    if (!message) return null;

    const handleDecrypt = (password: string) => {
        const decryptedContent = decryptMessage(id, password);
        if (decryptedContent !== null) {
            setContent(decryptedContent);
            setIsDecrypted(true);
        } else {
            alert("Mot de passe incorrect !");
        }
    };

    const handleUpdate = (password: string) => {
        if (content && password) {
            updateMessage(id, content, password);
            setIsEditing(false);
            setIsDecrypted(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
            deleteMessage(id);
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {isDecrypted ? (
                    <div>
                        {isEditing ? (
                            <textarea
                                className="form-control mb-2"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        ) : (
                            <p>{content}</p>
                        )}
                        {isEditing && (
                            <PasswordInput onPasswordSubmit={handleUpdate} />
                        )}
                    </div>
                ) : (
                    <PasswordInput onPasswordSubmit={handleDecrypt} />
                )}
                <button
                    className="btn btn-warning me-2"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Annuler" : "Modifier"}
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Supprimer
                </button>
            </div>
        </div>
    );
};

export default Message;
