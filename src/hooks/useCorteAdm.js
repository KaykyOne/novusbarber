import { useState, useEffect } from 'react';
import { getCortes, insertCorte } from '../controller/ControllerCorte';
import { restoreColors } from '../suport/Desgin';
import { getServices } from '../controller/ControllerService';
import { useNavigate } from 'react-router-dom';
import Corte from '../class/Corte';
import { format } from 'date-fns';
import ToastNotification, { showToast } from "../components/Notifications/ToastNotification"; // Importando o componente e a função

export function useCorteAdm(response, id) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  const [loading, setLoading] = useState(false);
  const [cortes, setCortes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [comboSelect, setComboSelect] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erroCampos, setErroCampos] = useState({
    nome: false,
    sobrenome: false,
    telefone: false,
  });

  useEffect(() => {
    setLoading(true);
    console.log(id);  

    restoreColors();
    GetAndAnalizeCortes();
    GetAndAnalizeServices();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      GetAndAnalizeCortes(selectedDate);
    }
  }, [selectedDate]);

  const GetAndAnalizeCortes = async () => {
    try {
      let cortesSearch = await getCortes(selectedDate, response.id);
      setCortes(cortesSearch);
    } catch (error) {
      console.error(`Erro ao buscar os cortes do dia: ${error}`);
    }
  };

  const GetAndAnalizeServices = async () => {
    try {
      let servicesSearch = await getServices(response.id);
      setServicos(servicesSearch);
      console.log(servicesSearch);
    } catch (error) {
      console.error(`Erro ao buscar os serviços do dia: ${error}`);
    }
  };

  const alterData = (date) => {
    console.log("Nova data selecionada:", date);
    setSelectedDate(date);
  };

  const handleButtonClick = () => {
    setLoading(true);
    try {
      console.log("Valor do comboSelect:", comboSelect);  // Verificar o valor de comboSelect

      // Adicionando uma verificação para garantir que comboSelect não esteja vazio ou nulo
      if (!comboSelect) {
        console.log("Seleção não válida para o comboSelect!");
        showToast('Corte Selecionado Inválido.', 'error');
        return; 
      }

      let valid = true;
      const erroNovo = { nome: false, sobrenome: false, telefone: false };

      if (telefone === "" || telefone.trim().length < 10) {
        erroNovo.telefone = true;
        valid = false;
        showToast('Campos Inválidos.', 'error');
      }

      if (nome === "") {
        erroNovo.nome = true;
        valid = false;
        showToast('Campos Inválidos.', 'error');
      }

      if (sobrenome === "") {
        erroNovo.sobrenome = true;
        valid = false;
        showToast('Campos Inválidos.', 'error');
      }

      setErroCampos(erroNovo);

      if (!valid) return;
      if (!selectedDate || !selectedTime) {showToast('Horário ou Data não selecionado ou inválido!', 'error'); return;}

      const dataHora = `${format(selectedDate, 'yyyy-MM-dd')} ${format(selectedTime, 'HH:mm:ss')}`;
      const novoCorte = new Corte(null, id, response.id, nome, sobrenome, telefone, comboSelect, dataHora);
      insertCorte(novoCorte)
        .then((corteInserido) => {
          if (corteInserido) {
            console.log('Corte inserido com sucesso:', corteInserido);
            navigate(`/conclusion`, { state: { id, corte_inserido: corteInserido } });
          } else {
            showToast('Falha ao inserir corte.', 'error');
          }
        })
        .catch((error) => {
          console.error('Erro ao tentar inserir corte:', error);
        });
    } catch (erro) {
      console.log('Erro!: ', erro)
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (id) {
      navigate('/homeadm', { state: { id, response } });
    } else {
      console.error("ID não definido!");
    }
  };

  return {
    nome,
    setNome,
    handleButtonClick,
    sobrenome,
    setSobrenome,
    telefone,
    setTelefone,
    selectedDate,
    comboSelect,
    setComboSelect,
    handleBack,
    selectedTime,
    loading,
    cortes,
    servicos,
    erroCampos,
    setErroCampos,
    setSelectedDate,
    setSelectedTime,
    alterData,
    ToastNotification,
  };
}
