import React from 'react';
import Input from './Input';
import Button from './Button';
import BackIcon from '@mui/icons-material/ArrowBack';
import ConfirmIcon from '@mui/icons-material/Check';

export default function CancelForm({ codigoCancel, setCodigoCancel, onCancelConfirm, onBack }) {
    return (
        <div className="cancel-form">
            <Input
                value={codigoCancel} 
                className={"input"}
                setValor={setCodigoCancel}
                type={"text"}
                placeholder={"Código..."}
            />

            <Button classNameType="btn-primary" onClickButton={onCancelConfirm}>
                Confirmar Cancelamento
                <ConfirmIcon/>
            </Button>
            <Button classNameType="btn-secondary" onClickButton={onBack}>
                Voltar
                <BackIcon/>
            </Button>
        </div>
    );
}
