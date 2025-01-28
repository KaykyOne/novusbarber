import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getBarbearia, getImageUrl } from '../suport/Desgin';
import Button from '../components/Button';
import Loading from '../components/Loading';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import { saveColors } from '../suport/Desgin';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoNovusTech from '../imgs/logoNovusTech.png'

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [nameBusiness, setNameBusiness] = useState("Nome da Barbearia");
  const navigate = useNavigate();
  const bandeira = "\u{1F1E7}\u{1F1F7} Brasil";


  const alterPageCustomer = () => {
    navigate(`/selectprofessional`, { state: { id: id } });
  };

  const alterPageError = () => {
    navigate(`/error`);
  };

  const alterPageCancel = () => {
    navigate(`/cancel`, { state: { id: id } });
  }

  const alterPageAdm = () => {
    navigate(`/loginadm`, { state: { id: id } });
  }

  useEffect(() => {
    setLoading(true)
    const fetchImage = async () => {
      try {
        const dados = await getBarbearia(id);
        if (dados) {
          document.documentElement.style.setProperty('--cor-primaria', dados.cor_principal);
          document.documentElement.style.setProperty('--cor-secundaria', dados.cor_secundaria);
          saveColors(dados.cor_principal, dados.cor_secundaria);
          setNameBusiness(dados.nome)
        } else {
          console.error('Cores não encontradas para ID:', id);
          alterPageError();
        }
        const filePath = `${dados.logo_url}.png`;
        const url = await getImageUrl(filePath, 'logos');
        if (url) setImageUrl(url);
        else console.error('Não foi possível carregar a imagem.');
      } catch (error) {
        console.error('Erro no fetchImage:', error);
      }
    };

    fetchImage();
    setLoading(false);
  }, [id]);


  return (
    <div>
      <Loading show={loading} /> {/* Mostra o overlay enquanto carrega */}
      <div className="header">
        <h1>NovusBarber</h1>
        <p>Experiência de alto nível, corte impecável!</p>
        <img></img>
      </div>

      <img src={imageUrl} className="logo" />

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
      </div>

      <div className="footer">
        <h4>Feito por NovusTech</h4>
        <img className='logoNovus' src={LogoNovusTech}/>
      </div>
    </div>
  );
}
