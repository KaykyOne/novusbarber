import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import BackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { restoreColors } from '../../suport/Desgin';
import Loading from '../../components/Loading';
import GenericModal from '../../components/GenericModal';
import Input from '../../components/Input';
import { getServices, updateService, insertService } from '../../controller/ControllerService';
import Servico from '../../class/Servico';
import "../../css/Service.css";

export default function Services() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, response } = location.state || {};
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [nome, setNome] = useState('');
  const [tempo_medio, setTempoMedio] = useState();
  const [preco, setPreco] = useState('');
  const [barbeiro_id] = useState(response.id);

  useEffect(() => {
    setLoading(true);
    restoreColors();
    fetchServices();
    setLoading(false);
  }, [id]);

  const fetchServices = async () => {
    if (!response.id) return console.error("ID do barbeiro não encontrado!");
    const servicos = await getServices(response.id);
    setServices(servicos.map(s => new Servico(s.id, s.nome, s.tempo_medio, s.preco, s.barbeiro_id)));
  };

  // Formata o tempo no formato HH:mm:ss
  const formatTime = (value) => {
    // Verifique se a string tem o formato correto
    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    if (regex.test(value)) {
      return value; // Retorna o valor no formato correto
    }
    return '00:00:00'; // Retorna um valor padrão caso a string não seja válida
  };


  const handleBack = () => {
    navigate("/homeadm", { state: { id, response } });
  };

  const handleModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setNome(service.nome);
      setTempoMedio(service.tempoMedio);  // Atualiza com um valor Date válido
      setPreco(service.preco);
    } else {
      setEditingService(null);
      setNome('');
      setTempoMedio('00:30:00');  // Inicializa com a data atual, caso não tenha um serviço selecionado
      setPreco('');
    }
    setVisible(true);
  };


  const handleSaveService = async () => {
    setLoading(true);
    const service = new Servico(
      editingService?.id || null,
      nome,
      formatTime(tempo_medio),  // Formata corretamente o tempo
      preco,
      barbeiro_id
    );
    console.log(service);
    if (editingService) {
      await updateService(service);
    } else {
      await insertService(service);
    }
    await fetchServices();
    setLoading(false);
    setVisible(false);
  };

  const renderService = (service) => {
    return (
      <div key={service.id} className="service-item">
        <h2>{service.nome}</h2>
        <h3>{service.tempoMedio}</h3>
        <h3>R${service.preco}</h3>
        <Button classNameType="btn-secondary" onClickButton={() => handleModal(service)}>
          Editar
          <EditIcon />
        </Button>
      </div>
    );
  };
  


  return (
    <div className='container'>
      <Loading show={loading} />
      <h2>Serviços</h2>
      <div className="services-list">
        {services.map(renderService )}
      </div>

      <Button classNameType="btn-primary" onClickButton={() => handleModal()}>
        Novo Serviço
        <AddIcon />
      </Button>
      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>

      {visible &&
        <GenericModal>
          <h2>{editingService ? "Editar Serviço" : "Adicionar Serviço"}</h2>
          <Input className={'input'} type="text" placeholder="Nome" value={nome} setValor={setNome} />
          <Input className={'input'} type="number" placeholder="Preço" value={preco} setValor={setPreco} />
          <Input className={'input'} type="text" placeholder="Tempo Médio" value={tempo_medio} setValor={setTempoMedio} />

          <Button onClickButton={handleSaveService}>Salvar</Button>
          <Button onClickButton={() => setVisible(false)}>Cancelar</Button>
        </GenericModal>
      }
    </div>
  );
}
