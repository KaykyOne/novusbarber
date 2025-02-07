import React from 'react';
import { useLocation } from "react-router-dom";
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import '../../css/SelectDateAndHour.css';
import BackIcon from '@mui/icons-material/ArrowBack';
import IconFront from '@mui/icons-material/ChevronLeft';
import Iconbackside from '@mui/icons-material/ChevronRight';
import RenderItem from '../../components/RenderItem';
import useSelectDateAndHour from '../../hooks/useSelectDateAndHour';

export default function SelectDateAndHour() {
    const location = useLocation();
    const { id, id_barbeiro, profissional } = location.state || {};
    const { selectedDate, setSelectedDate, loading, horas, diaSemana, diasSemana, handleBack, handleButtonClick, alterDateForButton } = useSelectDateAndHour(id, id_barbeiro, profissional);

    return (
        <div className='container'>
            <h2>Selecione uma data</h2>
            {/* DatePicker para selecionar a data */}
            {/* <div className='container-horizontal'> */}
                {/* <IconFront onClick={() => alterDateForButton('back')}/> */}
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    placeholderText="Escolha uma data"
                    className="custom-datepicker-input" // Classe para o input
                    calendarClassName="custom-calendar" // Classe para o calendário
                />
                {/* <Iconbackside onClick={() => alterDateForButton('front')}/> */}
            {/* </div> */}

            <p>{diasSemana[diaSemana]}-feira</p>
            {loading ? (
                <Loading show={loading} />
            ) : !selectedDate ? (
                <p>Por favor, selecione uma data para ver os horários disponíveis.</p>
            ) : horas.length === 0 ? (
                <div>
                    <p className="error-text">
                        Nenhum horário encontrado para {format(selectedDate, 'dd/MM/yyyy')}. <br />
                    </p>
                </div>
            ) : (
                <div className="hour-list">
                    {horas.map((item, index) => (
                        <RenderItem
                            key={index} // Adicionando a key aqui
                            item={item}
                            index={index}
                            handleButtonClick={handleButtonClick}
                            valor={"hora"}
                            className={"hour-button"}
                        />
                    ))}
                </div>

            )}

            <Button classNameType={"btn-secondary"} onClickButton={handleBack}>
                Voltar
                <BackIcon />
            </Button>
        </div>
    );
}
