import React from 'react';

export default function StatusMessage({ message, type }) {
    return (
        message && (
            <div className={`status-message ${type}`}>
                {message}
            </div>
        )
    );
}
