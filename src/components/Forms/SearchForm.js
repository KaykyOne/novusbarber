import React from 'react';
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';
import BackIcon from '@mui/icons-material/ArrowBack';
import ConfirmIcon from '@mui/icons-material/Check';

export default function SearchForm({ valorPesquisa, setValorPesquisa, valor, onConfirm, onBack }) {
    return (
        <div className="form">
            <Input
                value={valorPesquisa} 
                className={"input"}
                setValor={setValorPesquisa}
                type={"text"}
                placeholder={`${valor}...`}
            />

            <Button classNameType="btn-primary" onClickButton={onConfirm}>
                Pesquisar
                <ConfirmIcon/>
            </Button>
            <Button classNameType="btn-secondary" onClickButton={onBack}>
                Voltar
                <BackIcon/>
            </Button>
        </div>
    );
}
