import React from 'react'

export default function CopyIconButton(copyStatus) {
    return (
        <div className={`status-message ${copyStatus}`}>
            {copyStatus === "success" ? "Código copiado com sucesso!" : "Erro ao copiar o código."}
        </div>
    )
}
