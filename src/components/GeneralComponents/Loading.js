import React from 'react';
import '../../css/NovusCss/Components/Loading.css'


export default function LoadingOverlay({ show }) {
  if (!show) return null; // Não renderiza nada se o loading estiver desativado

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}
