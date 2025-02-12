import React from 'react';
import '../../css/FullScreenModal.css'; // Certifique-se de ter o CSS correto

const FullScreenModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Resultados da Pesquisa</h2>
        <div className="modal-body">
          {results.length === 0 ? (
            <p>Nenhum serviço encontrado.</p>
          ) : (
            results.map((service, index) => (
              <div key={index} className="service-card">
                <p><strong>Nome do Cliente:</strong> {service.nome_cliente} {service.sobrenome_cliente}</p>
                <p><strong>Telefone:</strong> {service.telefone_cliente}</p>
                <p><strong>Data e Hora do Corte:</strong> {new Date(service.data_corte).toLocaleString()}</p>
                <p><strong>Serviço:</strong> {service.servicos.nome}</p>
                <p><strong>Preço:</strong> R${service.servicos.preco}</p>
                <p><strong>Barbeiro:</strong> {service.barbeiros.nome}</p>
              </div>
            ))
          )}
        </div>
        <button className="close-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default FullScreenModal;
