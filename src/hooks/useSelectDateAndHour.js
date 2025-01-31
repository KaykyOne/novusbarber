import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHorariosLivres } from '../controller/SelectDateAndHourController';
import { restoreColors } from '../suport/Desgin';
import { format, getDay } from 'date-fns';

export default function useSelectDateAndHour(id, id_barbeiro, profissional) {
    const navigate = useNavigate();
    const [horas, setHoras] = useState([]);
    const [loading, setLoading] = useState(false); // Loading começa como falso
    const [selectedDate, setSelectedDate] = useState(new Date()); // Estado inicial sem data
    const diaSemana = getDay(selectedDate);
    const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

    useEffect(() => {
        if (!selectedDate) return; // Só busca horários se uma data for selecionada
        // console.log(id_barbeiro)
        const fetchHoras = async () => {
            if (!id_barbeiro) {
                console.error('ID do barbeiro não foi passado via state.');
                return;
            }
            setLoading(true);
            restoreColors();
            try {
                const horasLivres = await getHorariosLivres(selectedDate, diasSemana[diaSemana], id_barbeiro);
                // console.log(horasLivres);
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

    return {selectedDate, setSelectedDate, loading, horas, diaSemana, diasSemana, handleBack, handleButtonClick}
}
