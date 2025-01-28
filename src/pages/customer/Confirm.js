import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/Confirm.css';
import Button from '../../components/Button';
import { insertCorte } from '../../controller/ConfirmController';
import { restoreColors } from '../../suport/Desgin';
import Corte from '../../class/Corte';
import { format } from 'date-fns';
import BackIcon from '@mui/icons-material/ArrowBack';
import ConfirmIcon from '@mui/icons-material/Check';
import brazilianFlag from '../../imgs/bandeiraBrIcone.png';

export default function Confirm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataHoraFormatada, setDataHoraFormatada] = useState('');
    const [erroCampos, setErroCampos] = useState({
        nome: false,
        sobrenome: false,
        telefone: false,
    });

    const { id, id_barbeiro, data_hora, id_service, profissional, servico, preco } = location.state || {};

    useEffect(() => {
        restoreColors();
        setDataHoraFormatada(format(data_hora, 'dd-MM-yyyy HH:mm:ss'))
    }, [data_hora]);

    const handleBack = () => {
        navigate(`/selectservice`, {
            state: { id, id_barbeiro, profissional, data_hora }
        });
    };

    const handleButtonClick = () => {
        let valid = true;
        const erroNovo = { nome: false, sobrenome: false, telefone: false };

        if (telefone === "" || telefone.trim().length < 10) {
            erroNovo.telefone = true;
            valid = false;
        }

        if (nome === "") {
            erroNovo.nome = true;
            valid = false;
        }

        if (sobrenome === "") {
            erroNovo.sobrenome = true;
            valid = false;
        }

        setErroCampos(erroNovo);

        if (!valid) return;

        const dataFormatada = format(data_hora, 'yyyy-MM-dd HH:mm:ss');
        const novoCorte = new Corte(null, id, id_barbeiro, nome, sobrenome, telefone, id_service, dataFormatada);
        insertCorte(novoCorte).then((corteInserido) => {
            if (corteInserido) {
                console.log('Corte inserido com sucesso:', corteInserido);
                navigate(`/conclusion`, { state: { id, corte_inserido: corteInserido } });
            } else {
                console.log('Falha ao inserir corte.');
            }
        });
    };

    const testTelefone = (valor) => {
        if (valor === "") {
            setTelefone(valor);
            return;
        }
        if (/^\d{0,11}$/.test(valor)) {
            setTelefone(valor);
        }
    };

    const testCaracteres = (valor, setter) => {
        if (typeof valor !== "string") return;
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(valor)) return;

        if (setter === 'nome') setNome(valor);
        if (setter === 'sobrenome') setSobrenome(valor);
    };

    return (
        <div className="confirm-container">
            <h2 className="title">FINALIZAR</h2>
            
            
            <div className={`input-group ${erroCampos.nome ? 'input-group-alert' : ''}`}>
                <input 
                    value={nome} 
                    onChange={(e) => testCaracteres(e.target.value, 'nome')} 
                    type="text" 
                    placeholder="NOME..." 
                />
            </div>
            <div className={`input-group ${erroCampos.sobrenome ? 'input-group-alert' : ''}`}>
                <input 
                    value={sobrenome} 
                    onChange={(e) => testCaracteres(e.target.value, 'sobrenome')} 
                    type="text" 
                    placeholder="SOBRENOME..." 
                />
            </div>
            <div className={`input-group phone-input ${erroCampos.telefone ? 'input-group-alert' : ''}`}>
                <img className="flag" src={brazilianFlag} alt="Bandeira do Brasil" />
                <input
                    value={telefone}
                    onChange={(e) => testTelefone(e.target.value)}
                    type="tel"
                    placeholder="TELEFONE(00)000000000..."
                />
            </div>

            <div className="summary-box">
                <h3>RESUMO:</h3>
                <p><strong>PROFISSIONAL:</strong> {profissional || 'N/A'}</p>
                <p><strong>DATA E HORA:</strong> {dataHoraFormatada || 'N/A'}</p>
                <p><strong>SERVIÇO:</strong> {servico || 'N/A'}</p>
                <p><strong>VALOR FINAL:</strong> <span className="price">R$ {preco + ",00" || '0,00'}</span></p>
            </div>

            <div className="button-group">
                <Button classNameType="btn-primary" onClickButton={handleButtonClick}>
                    CONFIRMAR
                    <ConfirmIcon />
                </Button>
                <Button classNameType="btn-secondary" onClickButton={handleBack}>
                    VOLTAR
                    <BackIcon />
                </Button>
            </div>
        </div>
    );
}
