import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import PersonalDataForm from '../../components/PersonalDataForm'; // Importando o novo componente
import { useLocation } from 'react-router-dom'; // Hook para acessar o state
import { useNavigate } from "react-router-dom";
import BackIcon from '@mui/icons-material/ArrowBack';
import ConfirmIcon from '@mui/icons-material/Check';
import { restoreColors } from '../../suport/Desgin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/CreateCorteAdm.css';

export default function CreateCorteAdm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, response } = location.state || {};
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  const [erroCampos, setErroCampos] = useState({
    nome: false,
    sobrenome: false,
    telefone: false,
  });

  useEffect(() => {
    // console.log(id, response);
    restoreColors();
  }, [])

  const handleBack = () => {
    if (id) {
      navigate('/homeadm', { state: { id, response } })
    } else {
      console.error("ID não definido!");
    }
  };

  return (
    <div className='container'>
      <h1>Marcar Horário!</h1>
      <div className="data-container">
      <p>Data:</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Escolha uma data"
          className="custom-datepicker-input"
          calendarClassName="custom-calendar"
        />
      </div>
      <div className="data-container">
      <p>Hora:</p>
        <DatePicker
          selected={selectedTime}
          onChange={(time) => setSelectedTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15} // Define os intervalos (ex: 15 em 15 min)
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          placeholderText="Escolha um horário"
          className="custom-timepicker-input"
        />
      </div>

      <PersonalDataForm
        nome={nome}
        setNome={setNome}
        sobrenome={sobrenome}
        setSobrenome={setSobrenome}
        telefone={telefone}
        setTelefone={setTelefone}
        erroCampos={erroCampos}
      />

      <Button classNameType="btn-tertiary" onClickButton={handleBack}>
        Confirmar
        <ConfirmIcon />
      </Button>
      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>
    </div >
  )
}
