import React, { useState } from 'react';

function TokenGenerator() {
    const [token, setToken] = useState('');

    const generateToken = () => {
        const newToken = Math.random().toString(36).substr(2, 10);
        setToken(newToken);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Generate Token</h2>
                <button onClick={generateToken}>Generate</button>
                {token && <p>Your Token: {token}</p>}
            </div>
        </div>
    );
}

export default TokenGenerator;