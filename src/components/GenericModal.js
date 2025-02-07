import React from "react";
import "../css/modalConfirm.css";

export default function GenericModal({ children }) { // Alterado de "child" para "children"
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                {children}
            </div>
        </div>
    );
}
