import React from 'react';
import '../css/Loading.css'


export default function LoadingOverlay({ show }) {
  if (!show) return null; // Não renderiza nada se o loading estiver desativado

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}
