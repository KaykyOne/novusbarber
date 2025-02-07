import { useState, useEffect } from "react";
import { getCortesForBarbeiro, deleteCorte } from "../controller/ControllerCorte";
import { restoreColors } from "../suport/Desgin";

export function useCortes(response) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [cortes, setCortes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const fetchCortes = async (date) => {
    if (!response?.id) return;

    restoreColors();
    setLoading(true);

    const data = await getCortesForBarbeiro(response.id, date);
    setCortes(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchCortes(selectedDate);
  }, [selectedDate]);

  const handleDelete = (item) => {
    setPendingAction({ type: "delete", item });
    setShowModal(true);
  };

  const handleZap = (item) => {
    setPendingAction({ type: "zap", item });
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);

    if (pendingAction?.type === "delete") {
      const id_corte = pendingAction.item.id;
      if (!id_corte) return;

      const res = await deleteCorte(id_corte);
      if (res) {
        setCortes([]);
        await fetchCortes(selectedDate);
      }
    } else if (pendingAction?.type === "zap") {
      const numeroTelefone = pendingAction.item.telefone_cliente;
      if (!numeroTelefone) return;

      const mensagem = encodeURIComponent(
        `Olá, ${pendingAction.item.nome}! Gostaria de falar sobre o seu agendamento.`
      );
      const linkWhatsApp = `https://wa.me/+55${numeroTelefone}?text=${mensagem}`;

      window.open(linkWhatsApp, "_blank");
    }
    setPendingAction(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingAction(null);
  };

  return {
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
  };
}
