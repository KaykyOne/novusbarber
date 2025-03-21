import React, { useState, useEffect } from 'react';
import Button from '../../components/Buttons/Button';
import { useLocation } from 'react-router-dom'; // Hook para acessar o state
import { useNavigate } from "react-router-dom";
import Loading from '../../components/GeneralComponents/Loading';
import BackIcon from '@mui/icons-material/ArrowBack';
import AddCorteIcon from '@mui/icons-material/AddCircle';
import CutIcon from "@mui/icons-material/ContentCut";
import ListIcon from '@mui/icons-material/List';
import ConfigIcon from '@mui/icons-material/Settings';
import EditHourIcon from '@mui/icons-material/EditCalendar';  
import AlarmIcon from '@mui/icons-material/Alarm'
import { restoreColors } from '../../suport/Desgin';

export default function HomeAdm() {
  const location = useLocation(); // Acessa o state da navegação
  const navigate = useNavigate();
  const { id, response } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    restoreColors();
    setLoading(false);
  }, [id, response])

  const handleClickAlter = (page) => {
    navigate(`/${page}`, { state: { id, response } });
  }

  const handleBack = () => {
    if (id) {
      navigate(`/${id}`);
    } else {
      console.error("ID não definido!");
    }
  };

  return (
    <div className='container'>
      <Loading show={loading} />
      <h1>Olá {response.nome}!</h1>

      <Button classNameType="btn-tertiary" onClickButton={() => handleClickAlter('createcorteadm')}>
        Marcar Horário
        <AddCorteIcon />
      </Button>

      <Button classNameType="btn-tertiary" onClickButton={() => handleClickAlter('managedays')}>
        Editar Horários
        <EditHourIcon />
      </Button>

      <Button classNameType="btn-tertiary" onClickButton={() => handleClickAlter('service')}>
        Serviços
        <CutIcon />
      </Button>

      <Button classNameType="btn-tertiary" onClickButton={() => handleClickAlter('list')}>
        Listar Horários
        <ListIcon />
      </Button>

      <Button classNameType="btn-tertiary" onClickButton={() => handleClickAlter('exception')}>
        Exceções de Horários
        <AlarmIcon />
      </Button>

      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>
      <Button classNameType="btn-config" onClickButton={() => handleClickAlter('config')}>
        <ConfigIcon />
      </Button>
    </div>
  )
}
