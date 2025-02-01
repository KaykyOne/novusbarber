import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/Cancel.css';
import { restoreColors } from '../../suport/Desgin';
import { deleteCorte } from '../../controller/CancelController';
import CancelForm from '../../components/CancelForm'; // Importando o formulário
import StatusMessage from '../../components/StatusMessage'; // Importando a mensagem de status
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
        <div className="container">
            <h1>Cancelamento</h1>
            <h2>Desmarcar Agendamento</h2>
            <h3>Utilize o código que você copiou do agendamento aqui para desmarcar seu horário!</h3>

            {/* Exibindo o formulário e a mensagem de status */}
            <CancelForm 
                codigoCancel={codigoCancel}
                setCodigoCancel={setCodigoCancel}
                onCancelConfirm={handleCancelConfirm}
                onBack={handleBack}
            />
            
            <StatusMessage 
                message={statusMessage} 
                type={statusType} 
            />
        </div>
    );
}
