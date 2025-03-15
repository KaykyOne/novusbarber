import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import ConfirmIcon from '@mui/icons-material/Check';
import BackIcon from '@mui/icons-material/ArrowBack';
import ListIcon from '@mui/icons-material/ListAlt';
import ToastNotification, { showToast } from "../../components/Notifications/ToastNotification";
import Loading from '../../components/GeneralComponents/Loading';
import { restoreColors } from '../../suport/Desgin';
import Input from '../../components/Inputs/Input';
import DatePicker from 'react-datepicker';
import { CreateExceptionFunction, ListExceptionsFunction, DeleteExceptionFunction } from '../../controller/ControllerExcecao';
import Excecao from '../../class/Excecao';
import { format, set } from "date-fns";
import GenericModal from '../../components/Modals/GenericModal';
import "../../css/List.css";

export default function CreateException() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, response } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [inicio, setInicio] = useState(null);
    const [fim, setFim] = useState(null);
    const [tipo, setTipo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [excecoes, setExcoes] = useState([]);

    useEffect(() => {
        restoreColors();
    }, []);

    const handleButtonClick = async () => {
        if (!response?.id || !selectedDate || !inicio || !fim || !tipo) {
            showToast("Preencha todos os campos obrigatórios!", "error");
            return;
        }

        try {
            setLoading(true);
            const novaExcecao = new Excecao(
                null,
                response.id,
                format(selectedDate, "yyyy-MM-dd"),
                format(inicio, "HH:mm:ss"),
                format(fim, "HH:mm:ss"),
                tipo,
                descricao
            );

            const res = await CreateExceptionFunction(novaExcecao);

            if (res) {
                showToast("Exceção criada com sucesso!", "success");
            } else {
                showToast("Erro ao criar exceção!", "error");
            }
        } catch (error) {
            console.error("Erro ao criar exceção:", error);
            showToast("Erro interno. Tente novamente!", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/homeadm", { state: { id, response } });
    };

    const openModal = async () => {
        setLoading(true);
        try{
            let excecoes = await ListExceptionsFunction(response.id);
            setExcoes(excecoes);
            setModalVisible(true);
        }catch(error){
            return;
        }finally{
            setLoading(false);
        }


    };

    const handleDeleteException = async (id) => {
        setLoading(true);
        try {
            // Chama a função para excluir a exceção
            let res = await DeleteExceptionFunction(id);
    
            // Verifica se a exclusão foi bem-sucedida
            if (res) {
                showToast("Exceção excluída com sucesso!", "success");
    
                // Recarrega a lista de exceções após a exclusão
                let excecoes = await ListExceptionsFunction(response.id);
                setExcoes(excecoes);
            } else {
                showToast("Erro ao excluir exceção!", "error");
            }
        } catch (error) {
            showToast("Erro ao excluir exceção!", "error");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="container">
            <ToastNotification />
            {modalVisible && (
                <GenericModal>
                    <Button classNameType="btn-tertiary" onClickButton={() => setModalVisible(!modalVisible)} disabled={loading}>
                        Fechar
                    </Button>
                    <h1>Exceções</h1>
                    <div className="scrollable-list">
                        {excecoes.length > 0 ? (
                            excecoes.map((item) => (
                                <div key={item.id}>
                                    <p>Data: {item.data}</p>
                                    <p>Hora Início: {item.horaInicio}</p>
                                    <p>Hora Fim: {item.horaFim}</p>
                                    <p>Tipo: {item.tipo}</p>
                                    <p>Descrição: {item.descricao}</p>
                                    <Button classNameType="btn-primary" onClickButton={() => handleDeleteException(item.id)} disabled={loading}>
                                        Excluir
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum horário disponível.</p>
                        )}
                    </div>
                </GenericModal>
            )}
            <Loading show={loading} />
            <h1>Criar Exceção de Horário</h1>

            <h2>Data:</h2>
            <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                className="custom-timepicker-input"
            />

            <h2>Horário Início:</h2>
            <DatePicker
                selected={inicio}
                onChange={setInicio}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                placeholderText="Escolha um horário"
                className="custom-timepicker-input"
            />

            <h2>Horário Fim:</h2>
            <DatePicker
                selected={fim}
                onChange={setFim}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                placeholderText="Escolha um horário"
                className="custom-timepicker-input"
            />

            <h2>Motivo:</h2>
            <Input
                value={tipo}
                setValor={setTipo}
                className="input"
                type="text"
                placeholder="feriado, problema e etc..."
            />

            <h2>Descrição (opcional):</h2>
            <Input
                value={descricao}
                setValor={setDescricao}
                className="input"
                type="text"
                placeholder="..."
            />

            <Button classNameType="btn-primary" onClickButton={openModal} disabled={loading}>
                Ver Exceções
                <ListIcon />
            </Button>

            <Button classNameType="btn-tertiary" onClickButton={handleButtonClick} disabled={loading}>
                {loading ? "Salvando..." : "Confirmar"}
                <ConfirmIcon />
            </Button>

            <Button classNameType="btn-primary" onClickButton={handleBack}>
                Voltar
                <BackIcon />
            </Button>
        </div>
    );
}
