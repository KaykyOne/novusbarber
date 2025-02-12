import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import Button from '../../components/Buttons/Button';

export default function Config() {
  const location = useLocation();
  const { id, response } = location.state || {};
  const navigate = useNavigate();

  const handleBack = () => {
    if (id) {
      navigate("/homeadm", { state: { id, response } });
    } else {
      console.error("ID não definido!");
    }
  };

  return (
    <div className='container'>

      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>
    </div>
  )
}
