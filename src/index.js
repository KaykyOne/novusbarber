import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Importação do Router
import './style.css'; // Importa o arquivo styles.css



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolvendo a aplicação com BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
