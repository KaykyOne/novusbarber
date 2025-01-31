import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useBarbearia } from '../hooks/useBarbearia'; // Hook personalizado
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkLocalizacao from '../components/LinkLocalizacao';
import ParadaDeBarbeiro from '../imgs/paradaDeBarbeiro.png';
import Footer from '../components/Footer';
import '../css/Home.css'

export default function Home() {
  const id = window.location.hash.split('/').pop();
  const navigate = useNavigate();

  const { imageUrl, loading, nameBusiness, mapsUrl } = useBarbearia(id); // Usando o hook personalizado

  const alterPageCustomer = () => {
    navigate(`/selectprofessional`, { state: { id } });
  };

  const alterPageCancel = () => {
    navigate(`/cancel`, { state: { id } });
  };

  const alterPageAdm = () => {
    navigate(`/loginadm`, { state: { id } });
  };

  return (
    <div className='containerHome'>
      <Loading show={loading} />
      <div className="header">
        <div className='sub_header'>
          <h1>NovusBarber</h1>
          <p>Experiência de alto nível, corte impecável!</p>
        </div>
      </div>

      <img src={ParadaDeBarbeiro} className="paradaBarbeariaCss" alt="Imagem de barbearia" />
      <img src={imageUrl} className="logo" alt="Logo da Barbearia" />
      <img src={ParadaDeBarbeiro} className="paradaBarbeariaCss" alt="Imagem de barbearia" />
      
      <h2 className="title">{nameBusiness}</h2>
      <p className="subtitle">Agende seu horário de forma simplificada!</p>

      <div className="groupButton">
        <Button classNameType={"btn-secondary"} onClickButton={alterPageCustomer}>
          Marcar horário
          <ScheduleIcon />
        </Button>
        <Button classNameType={"btn-primary"} onClickButton={alterPageCancel}>
          Cancelar horário
          <CancelIcon />
        </Button>
        <Button classNameType={"btn-tertiary"} onClickButton={alterPageAdm}>
          Administração
          <SettingsIcon />
        </Button>
        <LinkLocalizacao mapsUrl={mapsUrl} className='linkLocalizacao' target="_blank" rel="noopener noreferrer"/>
        <Footer />
      </div>
    </div>
  );
}
