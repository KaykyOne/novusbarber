import React, { useState } from 'react';
import '../../css/NovusCss/Components/Checkbox.css';

export default function Checkbox({ id, name, value, text, checked, onChange }) {
    const handleCheckboxChange = (e) => {
        onChange(e.target.checked); // Passa o estado da checkbox para o componente pai
    };

    return (
        <div style={{ display: 'inline-block', margin: '10px' }}>
            <input 
                type="checkbox" 
                id={id} 
                name={name} 
                value={value} 
                checked={checked} // Define o estado como checked
                onChange={handleCheckboxChange} // Atualiza o estado quando alterado
            />
            <label htmlFor={id} style={{ marginLeft: '5px' }}>{text}</label>
        </div>
    );
}