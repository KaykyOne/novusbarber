import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/Conclusion.css';
import Button from '../../components/Button';
import { restoreColors } from '../../suport/Desgin';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import CopyIconButton from '../../components/CopyIconButton';
import { useClipboard } from '../../hooks/useClipboard';  // Importando o hook

export default function Conclusion() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, corte_inserido } = location.state || {};
    const [copyStatus, setCopyStatus] = useState(null); // "success" ou "error"

    // Usando o useClipboard
    const { copiado, copiarTexto } = useClipboard();

    useEffect(() => {
        restoreColors();
    }, []);

    const handleStart = () => {
        navigate(`/${id}`);
    };

    const handleCopy = () => {
        if (corte_inserido?.id) {
            // Passando o código a ser copiado para a função do hook
            copiarTexto(corte_inserido.id);
        }
    };

    useEffect(() => {
        if (copiado) {
            setCopyStatus("success");
        } else {
            setCopyStatus("error");
        }
    }, [copiado]);

    return (
        <div className="conclusion-container">
            <h1>Conclusão</h1>
            <h2>Código do agendamento</h2>
            <h3>Salve esse código para utilizar caso for desmarcar</h3>

            <div className="code-container">
                <h1>
                    <strong>{corte_inserido?.id || "Nenhum código disponível"}</strong>
                </h1>
                <Button classNameType="btn-copy" onClickButton={handleCopy}>
                    {copyStatus === "success" ? <CheckIcon /> : <ContentCopyIcon />}
                    {copyStatus === "success" ? " Copiado!" : " Copiar"}
                </Button>
            </div>

            <Button classNameType="btn-secondary" onClickButton={handleStart}>
                INÍCIO
            </Button>
        </div>
    );
}
