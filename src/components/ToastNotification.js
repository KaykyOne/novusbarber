import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      closeButton={false}
      pauseOnHover
      theme="colored"
    />
  );
};

// Função auxiliar para exibir o toast limpando o anterior
export const showToast = (message, type = "info") => {
  toast.dismiss(); // Remove qualquer toast existente antes de exibir um novo

  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    default:
      toast.info(message);
      break;
  }
};

export default ToastNotification;
