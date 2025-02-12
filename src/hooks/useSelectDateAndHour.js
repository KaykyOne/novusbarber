import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHorariosLivres } from '../controller/ControllerProfessional';
import { restoreColors } from '../suport/Desgin';
import { format, getDay } from 'date-fns';
import ToastNotification, { showToast } from "../components/Notifications/ToastNotification"; // Importando o componente e a função

export default function useSelectDateAndHour(id, id_barbeiro, profissional) {
    const navigate = useNavigate();
    const [horas, setHoras] = useState([]);
    const [loading, setLoading] = useState(false); // Loading começa como falso
    const [selectedDate, setSelectedDate] = useState(new Date()); // Estado inicial sem data
    const diaSemana = getDay(selectedDate);
    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sábado'];

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

        const dataAtual = new Date();
        const horaAtual = new Date(); // Objeto Date com a hora atual
    
        // Converte horaSelecionada para um objeto Date válido
        const dataFormatada = format(selectedDate, 'yyyy-MM-dd');
        const horaSelecionadaDate = new Date(`${dataFormatada}T${hora}`);
    
        // Verifica se a hora já passou
        if (horaSelecionadaDate < dataAtual) {
            showToast('Erro, hora passada!', 'error');
            return;
        }

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

    const alterDateForButton = (type) => {
        setSelectedDate(prevDate => {
            let newDate = new Date(prevDate); // Criar uma nova instância de Date
    
            if (type === 'front') {
                newDate.setDate(newDate.getDate() + 1);
            } else if (type === 'back') {
                newDate.setDate(newDate.getDate() - 1);
            }
    
            // Verificação: Impedir datas anteriores a hoje
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Zerando horas para comparar só a data
    
            if (newDate < today) {
                return prevDate; // Se a data for inválida, não altera
            }
    
            return newDate; // Retorna a nova data válida
        });
    };
    
    

    const handleBack = () => {
        navigate(`/selectprofessional`, { state: { id } });
    };

    return {selectedDate, setSelectedDate, loading, horas, diaSemana, diasSemana, handleBack, handleButtonClick, alterDateForButton, ToastNotification}
}
