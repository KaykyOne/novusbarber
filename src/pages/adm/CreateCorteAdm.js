import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import ConfirmIcon from '@mui/icons-material/Check';
import Button from '../../components/Buttons/Button';
import PersonalDataForm from '../../components/Forms/PersonalDataForm';
import DatePicker from 'react-datepicker';
import Loading from '../../components/GeneralComponents/Loading';
import ComboBox from '../../components/GeneralComponents/ComboBox';
import { useCorteAdm } from '../../hooks/useCorteAdm'; // Importando o hook

import 'react-datepicker/dist/react-datepicker.css';
import '../../css/CreateCorteAdm.css';

export default function CreateCorteAdm() {
  const location = useLocation();
  const { id, response } = location.state || {};

  const {
    nome,
    setNome,
    sobrenome,
    handleButtonClick,
    setSobrenome,
    telefone,
    setTelefone,
    handleBack,
    selectedDate,
    selectedTime,
    comboSelect,
    setComboSelect,
    loading,
    servicos,
    cortes,
    erroCampos,
    setSelectedDate,
    setErroCampos,
    setSelectedTime,
    alterData,
    handleCreateCorte,
    ToastNotification,
  } = useCorteAdm(response, id); // Usando o hook



  return (
    <div className="container">
      <ToastNotification/>
      <Loading show={loading} />
      <h1>Marcar Horário!</h1>

      <ComboBox 
      valores={servicos}
      selectedValue={comboSelect}
      setSelectedValue={setComboSelect}
      />

      <PersonalDataForm
        nome={nome}
        setNome={setNome}
        sobrenome={sobrenome}
        setSobrenome={setSobrenome}
        telefone={telefone}
        setTelefone={setTelefone}
        erroCampos={erroCampos}
      />

      <div className="data-container">
        <h3>Data: </h3>
        <DatePicker
          selected={selectedDate}
          onChange={alterData}
          dateFormat="dd/MM/yyyy"
          placeholderText="Escolha uma data"
          className="custom-datepicker-input"
          calendarClassName="custom-calendar"
        />
      </div>

      <div className="data-container">
        <h3>Hora: </h3>
        <DatePicker
          selected={selectedTime}
          onChange={(time) => setSelectedTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          placeholderText="Escolha um horário"
          className="custom-timepicker-input"
        />
      </div>

      <div className="horarios-ocupados">
        <h3>Horários já ocupados:</h3>
        <div className="scrollable-list">
          {cortes.length > 0 ? (
            <div className="horarios-container">
              {cortes.map((corte, index) => (
                <div key={index} className="horario">
                  {corte}
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum horário ocupado!</p>
          )}
        </div>
      </div>

      <Button classNameType="btn-tertiary" onClickButton={handleButtonClick}>
        Confirmar
        <ConfirmIcon />
      </Button>
      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>
    </div>
  );
}
