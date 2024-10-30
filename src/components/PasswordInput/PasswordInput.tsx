import React, { useState } from "react";

interface PasswordInputProps {
    onPasswordSubmit: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordSubmit }) => {
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (password) onPasswordSubmit(password);
        setPassword("");
    };

    return (
        <div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="form-control mb-2"
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
                Confirmer le mot de passe
            </button>
        </div>
    );
};

export default PasswordInput;
