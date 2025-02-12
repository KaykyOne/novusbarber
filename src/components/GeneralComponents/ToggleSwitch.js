import React, { useState } from 'react';
import '../../css/NovusCss/Components/ToggleSwitch.css'; // Arquivo de CSS para estilizar o toggle

export default function ToggleSwitch({ label, initialState = false, onChange }) {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn); // Chama a função onChange, caso passe para o componente
    }
  };

  return (
    <div className="toggle-container">
      {label && <label className="toggle-label">{label}</label>}
      <div 
        className={`toggle-switch ${isOn ? 'on' : 'off'}`} 
        onClick={handleToggle}
      >
        <div className={`toggle-circle ${isOn ? 'on' : 'off'}`} />
      </div>
    </div>
  );
}
