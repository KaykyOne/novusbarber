import React from 'react';
import IconeLocalizacao from '@mui/icons-material/PinDrop';

function LinkLocalizacao({mapsUrl, className = "linkLocalizacao", target = "_blank", rel = "noopener noreferrer"}) {
    return (
        <>
            <a href={mapsUrl} className={className} target={target} rel={rel}>
                Ver localização da Barbearia!
                <IconeLocalizacao />
            </a>
        </>
    )
}

export default LinkLocalizacao