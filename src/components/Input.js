import React from 'react';

function Input({ value, setValor, className, type, placeholder }) {
    return (
        <>
            <input
                value={value}
                className={className} // Corrigido para className
                onChange={(e) => setValor(e.target.value)}
                type={type}
                placeholder={placeholder}
            />
        </>
    );
}

export default Input;