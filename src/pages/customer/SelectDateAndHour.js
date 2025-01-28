import React, { useEffect, useState } from 'react';
import { getHorariosLivres } from '../../controller/SelectDateAndHourController';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { restoreColors } from '../../suport/Desgin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, getDay } from 'date-fns';
import '../../css/SelectDateAndHour.css';
import BackIcon from '@mui/icons-material/ArrowBack';

export default function SelectDateAndHour() {
    const location = useLocation();
    const navigate = useNavigate();
    const {id, id_barbeiro, profissional} = location.state || {};
    const [horas, setHoras] = useState([]);
    const [loading, setLoading] = useState(false); // Loading começa como falso
    const [selectedDate, setSelectedDate] = useState(new Date()); // Estado inicial sem data

    useEffect(() => {
        if (!selectedDate) return; // Só busca horários se uma data for selecionada

        const fetchHoras = async () => {
            if (!id_barbeiro) {
                console.error('ID do barbeiro não foi passado via state.');
                return;
            }                       
            setLoading(true);
            restoreColors();

            const diaSemana = getDay(selectedDate);
            const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

            try {
                const horasLivres = await getHorariosLivres(selectedDate, diasSemana[diaSemana], id_barbeiro);
                console.log(horasLivres);
                setHoras((horasLivres || []).map(h => (typeof h === "string" ? { hora: h } : h)));
            } catch (error) {
                console.error('Erro ao buscar horários:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHoras();
    }, [id, selectedDate]);

    const handleButtonClick = (hora) => {
        if (!selectedDate || !hora) return;
    
        // Formata a data para "yyyy-MM-dd"
        const dataFormatada = format(selectedDate, 'yyyy-MM-dd');
    
        // Junta a data e a hora no formato "yyyy-MM-dd HH:mm:ss"
        const dataHora = `${dataFormatada} ${hora}`;
    
        navigate(`/selectservice`, { 
            state: { 
                id: id, 
                id_barbeiro: id_barbeiro, 
                profissional: profissional,
                data_hora: dataHora // Enviando a data e hora juntas
            } 
        });
    };
    

    const handleBack = () => {
        navigate(`/selectprofessional`, { state: { id } });
    };

    const renderHourItem = (item, index) => (
        <button
            key={index}
            onClick={() => handleButtonClick(item.hora)} // Passa o valor de item.hora
            className="hour-button"
        >
            {item.hora} {/* Renderiza o valor do horário */}
        </button>
    );


    return (
        <div className='container'>
            <h2>Selecione uma data</h2>
            {/* DatePicker para selecionar a data */}
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Escolha uma data"
                className="custom-datepicker-input" // Classe para o input
                calendarClassName="custom-calendar" // Classe para o calendário
            />


            {selectedDate && (
                <p>
                    <strong>Data selecionada:</strong> {format(selectedDate, 'dd/MM/yyyy')}
                </p>
            )}

            {loading ? (
                <Loading show={loading} />
            ) : !selectedDate ? (
                <p>Por favor, selecione uma data para ver os horários disponíveis.</p>
            ) : horas.length === 0 ? (
                <div>
                    <p className="error-text">
                        Nenhum horário encontrado para {format(selectedDate, 'dd/MM/yyyy')}. <br />
                    </p>
                </div>
            ) : (
                <div className="hour-container">
                    {horas.map((item, index) => renderHourItem(item, index))}
                </div>

            )}

            <Button classNameType={"btn-secondary"} onClickButton={handleBack}>
                Voltar
                <BackIcon />
            </Button>
        </div>
    );
}
