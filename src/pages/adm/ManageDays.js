import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import BackIcon from "@mui/icons-material/ArrowBack";
import { getHorarios, deleteHorario, insertHorario } from "../../controller/SelectDateAndHourController";
import Loading from "../../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import { restoreColors } from "../../suport/Desgin";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../css/List.css";
import GenericModal from "../../components/GenericModal";
import Input from "../../components/Input";
import ToastNotification, { showToast } from "../../components/ToastNotification"; // Importando o componente e a função

export default function ManageDays() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, response } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [selectedDay, setSelectedDay] = useState("segunda");
  const [visible, setVisible] = useState(false);
  const [horarioMarcado, setHorarioMarcado] = useState("07:00:00");
  const [editingService, setEditingService] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDados("segunda");
    restoreColors();
  }, [id]);

  const getDados = async (dia) => {
    try {
      let horariosData = await getHorarios(response.id, dia);
      setHorarios(horariosData);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedDay(event.target.value);
    getDados(event.target.value);
  };

  const handleBack = () => {
    if (id) {
      navigate("/homeadm", { state: { id, response } });
    } else {
      console.error("ID não definido!");
    }
  };

  const handleDelete = async (item) => {
    let res = await deleteHorario(item.id);
    if (res) {
      showToast("Horário excluído com sucesso!", "success");
    } else {
      showToast("Erro ao excluir horário!", "error");
    }
    await getDados(selectedDay);
  };

  const renderItem = (key, item) => {
    return (
      <div className="container-horizontal" key={key}>
        <h2>{item.hora}</h2>
        <Button classNameType="btn-primary" onClickButton={() => handleDelete(item)}>
          Excluir
          <DeleteIcon />
        </Button>
      </div>
    );
  };

  const handleModal = (service = null) => {
    if (service) {
      setEditingService(true);
      setHorarioMarcado(service.hora);
    } else {
      setEditingService(false);
    }
    setVisible(true);
  };

  const handleSaveService = async () => {
    let res = await insertHorario(response.id, selectedDay, horarioMarcado);
    if (res) {
      showToast("Horário adicionado com sucesso!", "success");
    } else {
      showToast("Erro ao adicionar horário!", "error");
    }
    setVisible(false);
    await getDados(selectedDay);
  };

  return (
    <div className="container">
      <ToastNotification /> {/* Apenas um ToastContainer na tela inteira */}
      <Loading show={loading} />
      <h2>Selecione os Dias da Semana</h2>
      <div className="container">
        <select onChange={handleSelectChange} value={selectedDay} className="input day-select">
          <option value="segunda">Segunda-feira</option>
          <option value="terca">Terça-feira</option>
          <option value="quarta">Quarta-feira</option>
          <option value="quinta">Quinta-feira</option>
          <option value="sexta">Sexta-feira</option>
          <option value="sabado">Sábado</option>
          <option value="domingo">Domingo</option>
        </select>
      </div>

      <div className="scrollable-list">
        {horarios.length > 0 ? horarios.map((item, index) => renderItem(index, item)) : <p>Nenhum horário disponível.</p>}
      </div>

      <Button classNameType="btn-primary" onClickButton={() => handleModal()}>
        Novo Horário
        <AddIcon />
      </Button>

      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>

      {visible && (
        <GenericModal>
          <h2>{editingService ? "Editar Horário" : "Adicionar Horário"}</h2>
          <Input className={"input"} type="text" placeholder="Horário" value={horarioMarcado} setValor={setHorarioMarcado} />
          <select onChange={handleSelectChange} value={selectedDay} className="input day-select">
            <option value="segunda">Segunda-feira</option>
            <option value="terca">Terça-feira</option>
            <option value="quarta">Quarta-feira</option>
            <option value="quinta">Quinta-feira</option>
            <option value="sexta">Sexta-feira</option>
            <option value="sabado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>

          <Button onClickButton={handleSaveService}>Salvar</Button>
          <Button onClickButton={() => setVisible(false)}>Cancelar</Button>
        </GenericModal>
      )}
    </div>
  );
}
