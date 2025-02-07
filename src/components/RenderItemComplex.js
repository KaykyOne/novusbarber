import React from 'react';
import '../css/SelectDateAndHour.css';
import Button from './Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ForumIcon from '@mui/icons-material/Forum';

function RenderItemComplex({ item, index, btnDelete, btnZap }) {
    return (
        <div key={index} className="service-card">
            <p><strong>Nome do Cliente:</strong> {item.nome_cliente} {item.sobrenome_cliente}</p>
            <p><strong>Telefone:</strong> {item.telefone_cliente}</p>
            <p><strong>Data e Hora do Corte:</strong> {new Date(item.data_corte).toLocaleString()}</p>
            <p><strong>Serviço:</strong> {item.servicos ? item.servicos.nome : "Não informado"}</p>
            <p><strong>Preço:</strong> {item.servicos ? `R$ ${item.servicos.preco}` : "Não informado"}</p>
            <p><strong>Barbeiro:</strong> {item.barbeiros ? item.barbeiros.nome : "Não informado"}</p>
            <div>
                <Button classNameType={'btn-delete'} onClickButton={btnDelete}>Excluir <DeleteIcon/></Button>
                <Button classNameType={'btn-zap'} onClickButton={btnZap}>Enviar Mensagem <ForumIcon/></Button>
            </div>
        </div>
    );
}

export default RenderItemComplex;
