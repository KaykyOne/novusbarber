import React, { useState } from "react";
import Button from "./Button";
import '../css/modalConfirm.css';

export default function ModalConfirm({ text, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Aviso!</h2>
                <p>{text}</p>
                <div className="modal-buttons">
                    <button className="cancel" onClick={onCancel}>Cancelar</button>
                    <button className="confirm" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}
