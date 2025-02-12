import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Loading from "../../components/GeneralComponents/Loading";
import RenderItemComplex from "../../components/Renders/RenderItemComplex";
import BackIcon from "@mui/icons-material/ArrowBack";
import Button from "../../components/Buttons/Button";
import ModalConfirm from "../../components/Modals/ModalConfirm";
import { useCortes } from "../../hooks/useCortes";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/List.css";

export default function List() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, response } = location.state || {};

  const {
    selectedDate,
    setSelectedDate,
    loading,
    cortes,
    showModal,
    pendingAction,
    handleDelete,
    handleZap,
    handleConfirm,
    handleCancel,
  } = useCortes(response);

  const handleBack = () => {
    if (id) {
      navigate("/homeadm", { state: { id, response } });
    } else {
      console.error("ID não definido!");
    }
  };

  return (
    <div className="container">
      <Loading show={loading} />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Escolha uma data"
        className="custom-datepicker-input"
        calendarClassName="custom-calendar"
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="scrollable-list">
          {cortes.length > 0 ? (
            cortes.map((item, index) => (
              <RenderItemComplex
                key={index}
                item={item}
                index={index}
                btnDelete={() => handleDelete(item)}
                btnZap={() => handleZap(item)}
              />
            ))
          ) : (
            <p>Nenhum horário disponível.</p>
          )}
        </div>
      )}

      <Button classNameType="btn-primary" onClickButton={handleBack}>
        Voltar
        <BackIcon />
      </Button>

      {showModal && (
        <ModalConfirm
          text="Deseja continuar?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
