import { useState, useEffect } from 'react';
import { getBarbearia, getImageUrl } from '../suport/Desgin';
import { saveColors } from '../suport/Desgin';
import { useNavigate } from 'react-router-dom';

export function useBarbearia(id) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nameBusiness, setNameBusiness] = useState("Nome da Barbearia");
  const [mapsUrl, setMapsUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("ID capturado:", id);  // Aqui você vê quando o id muda
    if (!id) {
      console.error('ID não encontrado');
      return;
    }

    setLoading(true);

    const createUrl = async (destino) => {
      const mapsUrl = `https://www.google.com/maps/dir//${encodeURIComponent(destino)}`;
      setMapsUrl(mapsUrl);
    }

    const alterPageError = () => {
      navigate(`/error`);
    };

    const fetchImage = async () => {
      try {
        const dados = await getBarbearia(id);
        if (dados) {
          document.documentElement.style.setProperty('--cor-primaria', dados.cor_principal);
          document.documentElement.style.setProperty('--cor-secundaria', dados.cor_secundaria);
          saveColors(dados.cor_principal, dados.cor_secundaria);
          setNameBusiness(dados.nome);
          const filePath = `${dados.logo_url}.png`;
          const url = await getImageUrl(filePath, 'logos');
          const localizacao = dados.localizacao;
          createUrl(localizacao);
          if (url) {
            setImageUrl(url);
          } else {
            console.error('Não foi possível carregar a imagem.');
          }
        } else {
          console.error('Dados da barbearia não encontrados para ID:', id);
          alterPageError();
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  return { imageUrl, loading, nameBusiness, mapsUrl };
}
