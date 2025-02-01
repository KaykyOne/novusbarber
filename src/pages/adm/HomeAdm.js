import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useLocation } from 'react-router-dom'; // Hook para acessar o state
import { useNavigate } from "react-router-dom";
import Loading from '../../components/Loading';
import BackIcon from '@mui/icons-material/ArrowBack';
import AddCorteIcon from '@mui/icons-material/AddCircle';
import ListIcon from '@mui/icons-material/List';
import ConfigIcon from '@mui/icons-material/Settings';
import EditHourIcon from '@mui/icons-material/EditCalendar';
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
    navigate(`/${page}`, { state: { id, response }});
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

      <Button classNameType="btn-tertiary" onClickButton={() => handleClickAlter('edithour')}>
        Editar Horários
        <EditHourIcon />
      </Button>

      <Button classNameType="btn-tertiary" onClickButton={() => handleClickAlter('listhour')}>
        Listar Horários
        <ListIcon />
      </Button>

      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>
      <Button classNameType="btn-config" onClickButton={handleBack}>
        <ConfigIcon />
      </Button>
    </div>
  )
}
