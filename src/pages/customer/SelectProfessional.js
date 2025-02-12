import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Hook para acessar o state
import { getProfessional } from '../../controller/ControllerProfessional';
import '../../css/SelectProfessional.css'; // Arquivo CSS separado
import Button from '../../components/Buttons/Button';
import { useNavigate } from "react-router-dom";
import Loading from '../../components/GeneralComponents/Loading';
import { restoreColors } from '../../suport/Desgin';
import BackIcon from '@mui/icons-material/ArrowBack';

export default function SelectProfessional() {
    const location = useLocation(); // Acessa o state da navegação
    const navigate = useNavigate();
    const { id } = location.state || {}; // Pega o ID do state
    const [barbeiros, setBarbeiros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfessional = async () => {
            if (!id) {
                console.error('ID não foi passado via state.');
                return;
            }
            setLoading(true);
            restoreColors();    
            try {
                const professionals = await getProfessional(id); // Busca profissionais pelo ID
                setBarbeiros(professionals || []); // Mapeia nomes
            } catch (error) {
                console.error('Erro ao buscar profissionais:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessional();
    }, [id]);

    const handleButtonClick = async (item) => {
        navigate(`/selectdateandhour`, { state: { id: id, id_barbeiro: item.id, profissional: item.nome} });
    }

    const handleBack = () => {
        if (id) {
            navigate(`/${id}`);
        } else {
            console.error("ID não definido!");
        }
    };
    

    const renderProfessionalItem = (item, index) => (
        <button
            key={index}
            onClick={() => handleButtonClick(item)}
            className="professional-button"
        >
            {item.nome}
        </button>
    );

    return (
        <div className="container">
            <h1>Escolha o Profissional</h1>
            {loading ? (
                <Loading show={loading} />
            ) : barbeiros.length === 0 ? (
                <div className="error-container">
                    <p className="error-text">
                        {'Nenhum profissional encontrado, entre em contato com o suporte!'}
                    </p>
                </div>
            ) : (
                <div className="professionals-list">
                    {barbeiros.map(renderProfessionalItem)}
                </div>
            )}
            <Button classNameType={"btn-secondary"} onClickButton={handleBack}>
                Voltar
                <BackIcon />
            </Button>
        </div>
    );
}
