import { useState } from "react";

export function useClipboard() {
    const [copiado, setCopiado] = useState(false);

    const copiarTexto = async (texto) => {
        try {
            await navigator.clipboard.writeText(texto);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000); // Reseta após 2 segundos
        } catch (err) {
            console.error("Erro ao copiar:", err);
            setCopiado(false);
        }
    };

    return { copiado, copiarTexto };
}
