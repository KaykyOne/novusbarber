import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useLocation } from 'react-router-dom'; // Hook para acessar o state
import { useNavigate } from "react-router-dom";
import Loading from '../../components/Loading';

export default function HomeAdm() {
  const location = useLocation(); // Acessa o state da navegação
  const navigate = useNavigate();
  const { id, response } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(id, " ", response);
    setLoading(false);
  }, [id, response])

  return (
    <div>
      <Loading show={loading} />
      HomeAdm</div>
  )
}
