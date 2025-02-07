import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/LoginAdm.css';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import BackIcon from '@mui/icons-material/ArrowBack';
import ConfirmIcon from '@mui/icons-material/Check';
import { restoreColors } from '../../suport/Desgin';
import { Login, SaveDados, restoreDados } from '../../controller/ControllerProfessional';
import Checkbox from '../../components/Checkbox';

export default function LoginAdm() {
    const location = useLocation(); // Acessa o state da navegação
    const navigate = useNavigate();
    const { id } = location.state || {};
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        restoreColors();
        const getDados = async () => {
            try {
                const { email, senha } = await restoreDados();

                // Verificar se os dados são válidos e não vazios
                if (email && senha) {
                    setIsChecked(true);
                    setEmail(email);
                    setSenha(senha);
                } else {
                    return;
                }
            } catch (error) {
                console.error("Erro ao restaurar os dados:", error);
            }
        };

        getDados();
        setLoading(false);
    }, [id])

    const handleLogin = async () => {
        const response = await Login(email, id, senha);
        if (response) {
            setStatusMessage("Login realizado com sucesso!");
            setStatusType("success");
            if (isChecked) {
                SaveDados(email, senha);
            } else {
                SaveDados('', '');
            }
            setTimeout(() => navigate('/homeadm', { state: { id: response.barbearia_id, response } }), 1000);
        } else {
            setStatusMessage("E-mail ou senha incorretos.");
            setStatusType("error");
        }
    };

    const handleBack = () => {
        if (id) {
            navigate(`/${id}`);
        } else {
            console.error("ID não definido!");
        }
    };

    return (
        <div className="container">
            <Loading show={loading} />
            <h1 className="title">Painel Administrativo</h1>
            <h3 className="subtitle">Acesse sua conta</h3>

            <div className="input-group">
                <input
                    value={email}
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="E-mail"
                />
            </div>

            <div className="input-group">
                <input
                    value={senha}
                    className="input"
                    onChange={(e) => setSenha(e.target.value)}
                    type="password"
                    placeholder="Senha"
                />
            </div>

            <Checkbox
                id="salvar"
                onChange={setIsChecked}
                name="salvarLogin"
                value="1"
                text="Salvar Login"
                checked={isChecked} />

            {statusMessage && (
                <div className={`status-message ${statusType}`}>
                    {statusMessage}
                </div>
            )}

            <Button classNameType="btn-primary" onClickButton={handleLogin}>
                Entrar
                <ConfirmIcon />
            </Button>

            <Button classNameType="btn-secondary" onClickButton={handleBack}>
                Voltar
                <BackIcon />
            </Button>
        </div>
    );
}
