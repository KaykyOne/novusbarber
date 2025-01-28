import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/Cancel.css';
import Button from '../../components/Button';
import { restoreColors } from '../../suport/Desgin';
import { deleteCorte } from '../../controller/CancelController';
import BackIcon from '@mui/icons-material/ArrowBack';

export default function Cancel() {
    const location = useLocation();
    const navigate = useNavigate();
    const [codigoCancel, setCodigoCancel] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState(''); // "success" ou "error"
    const { id } = location.state || {};

    useEffect(() => {
        restoreColors();
    }, []);

    const handleBack = () => {
        navigate(`/${id}`);
    };

    const handleCancelConfirm = async () => {
        if (!codigoCancel.trim()) {
            setStatusMessage("Por favor, insira um código válido.");
            setStatusType("error");
            return;
        }

        try {
            const data = await deleteCorte(codigoCancel);
            if (data) {
                setStatusMessage("Agendamento cancelado com sucesso!");
                setStatusType("success");
                setCodigoCancel('');
            } else {
                setStatusMessage("Erro ao cancelar. Verifique o código e tente novamente.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            setStatusType("error");
        }
    };

    return (
        <div className="conclusion-container">
            <h1>Cancelamento</h1>
            <h2>Desmarcar Agendamento</h2>
            <h3>Utilize o código que vc copiou do agendamento aqui para desmarcar seu horário!</h3>

            <div>
                <input 
                    value={codigoCancel} 
                    className='input' 
                    onChange={(e) => setCodigoCancel(e.target.value)} 
                    type="text" 
                    placeholder="Código..." 
                />
            </div>

            {/* Exibir mensagem de status */}
            {statusMessage && (
                <div className={`status-message ${statusType}`}>
                    {statusMessage}
                </div>
            )}

            <Button classNameType="btn-primary" onClickButton={handleCancelConfirm}>
                Confirmar Cancelamento
            </Button>
            <Button classNameType="btn-secondary" onClickButton={handleBack}>
                Voltar
                <BackIcon />
            </Button>
        </div>
    );
}
