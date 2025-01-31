import React from 'react';
import PropTypes from 'prop-types'

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