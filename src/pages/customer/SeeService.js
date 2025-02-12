import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/Cancel.css';
import { restoreColors } from '../../suport/Desgin';
import { getServiceForCustomer } from '../../controller/ControllerCorte';
import SearchForm from '../../components/Forms/SearchForm'; // Importando o formulário
import ToggleSwitch from '../../components/GeneralComponents/ToggleSwitch';
import FullScreenModal from '../../components/Modals/FullScreenModal '; // Importando o Modal

export default function SeeService() {
  const location = useLocation();
  const { id } = location.state || {};
  const [valorPesquisa, setValorPesquisa] = useState(""); // Valor da pesquisa
  const [searchBy, setSearchBy] = useState("id"); // Filtro de pesquisa (por id ou telefone)
  const [services, setServices] = useState([]); // Serviços encontrados
  const [isActive, setIsActive] = useState(false); // Estado do Toggle
  const [modalOpen, setModalOpen] = useState(false); // Estado do modal
  const navigate = useNavigate();

  useEffect(() => {
    restoreColors();
  }, []);

  const handleToggleChange = (newState) => {
    setIsActive(newState);
    setSearchBy(newState ? "telefone" : "id"); // Altera para telefone ou id dependendo do estado
  };

  const onConfirm = async () => {
    const filteredServices = await getServiceForCustomer(valorPesquisa, searchBy); // Passa os parâmetros para a função
    setServices(filteredServices); // Atualiza o estado com os resultados da pesquisa
    setModalOpen(true); // Abre o modal com os resultados
  };

  const onBack = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="container">
      <h1>Pesquisar Serviços</h1>
      <SearchForm
        valor={searchBy}
        valorPesquisa={valorPesquisa}
        setValorPesquisa={setValorPesquisa}
        onConfirm={onConfirm}
        onBack={onBack}
      />
      <ToggleSwitch
        label="Ativar pesquisa por telefone?"
        initialState={isActive}
        onChange={handleToggleChange}
      />
      {/* Modal para exibir os resultados */}
      <FullScreenModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} // Fecha o modal
        results={services}
      />
    </div>
  );
}
