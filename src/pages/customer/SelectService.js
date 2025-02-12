import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { restoreColors } from '../../suport/Desgin';
import { getServices } from '../../controller/ControllerService';
import Loading from '../../components/GeneralComponents/Loading';
import Button from '../../components/Buttons/Button'; // Corrigido
import '../../css/SelectServices.css';
import BackIcon from '@mui/icons-material/ArrowBack';

export default function SelectService() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, id_barbeiro, data_hora, profissional } = location.state || {};
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id_barbeiro) return; // Evita chamada desnecessária

        console.log(id, id_barbeiro, data_hora);
        const fetchServices = async () => {
            setLoading(true);
            restoreColors();
            try {
                const servicesGet = await getServices(id_barbeiro);
                setServices(servicesGet || []);
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [id_barbeiro]); // Corrigido

    const handleButtonClick = (item) => {
        navigate(`/confirm`, { state: { id, id_barbeiro, data_hora, id_service: item.id, profissional, servico: item.nome, preco: item.preco } });
    };

    const handleBack = () => {
        navigate(`/selectdateandhour`, { state: { id: id, id_barbeiro: id_barbeiro } });
    };

    const renderServiceItem = (item, index) => (
        <div key={index} className="service-button">
            <div>Tipo: {item.nome}</div>
            <div>Valor: {item.preco ? `R$ ${item.preco}` : 'Indisponível'}</div>
            <button className="choose-button" onClick={() => handleButtonClick(item)}>
                Escolher
            </button>
        </div>
    );

    return (
        <div className="container">
            <h1>Escolha o Serviço</h1>
            {loading ? (
                <Loading show={loading} />
            ) : services.length === 0 ? (
                <div className="error-container">
                    <p className="error-text">
                        {'Nenhum Serviço encontrado, entre em contato com o suporte!'}
                    </p>
                </div>
            ) : (
                <>
                    {!loading && services.length > 3 && ( // Mostra apenas se houver muitos serviços
                        <p className="scroll-indicator">↕ Role para ver mais serviços</p>
                    )}
                    <div className="services-list">
                        {services.map(renderServiceItem)}
                    </div>
                </>
            )}
            <Button classNameType="btn-secondary" onClickButton={handleBack}>
                Voltar
                <BackIcon />
            </Button>
        </div>

    );
}
