import React from 'react';
import '../../css/SelectDateAndHour.css';

function RenderItem({ item, index, handleButtonClick, valor, className }) {
    return (
        <>
            <button
                key={index}
                onClick={() => handleButtonClick(item[valor])} // Agora acessa a chave dinamicamente
                className={className}
            >
                {item[valor]} {/* Renderiza o valor do horário corretamente */}
            </button>

        </>
    )
}

export default RenderItem