import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Inputs/Input';
import bandeiraDoBrasil from '../../imgs/bandeiraBrIcone.png';

function PersonalDataForm({ nome, setNome, sobrenome, setSobrenome, telefone, setTelefone, erroCampos }) {
    const testTelefone = (valor) => {
        if (valor === "") {
            setTelefone(valor);
            return;
        }
        if (/^\d{0,11}$/.test(valor)) {
            setTelefone(valor);
        }
    };

    const testCaracteres = (valor, setter) => {
        if (typeof valor !== "string") return;
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(valor)) return;

        if (setter === 'nome') setNome(valor);
        if (setter === 'sobrenome') setSobrenome(valor);
    };

    return (
        <>
            <div className={`input-group ${erroCampos.nome ? 'input-group-alert' : ''}`}>
                <Input
                    value={nome}
                    setValor={(valor) => testCaracteres(valor, 'nome')}
                    className="input-field"
                    type="text"
                    placeholder="NOME..."
                />
            </div>
            
            <div className={`input-group ${erroCampos.sobrenome ? 'input-group-alert' : ''}`}>
                <Input
                    value={sobrenome}
                    setValor={(valor) => testCaracteres(valor, 'sobrenome')}
                    className="input-field"
                    type="text"
                    placeholder="SOBRENOME..."
                />
            </div>
            
            <div className={`input-group phone-input ${erroCampos.telefone ? 'input-group-alert' : ''}`}>
                <img className="flag" src={bandeiraDoBrasil} alt="Bandeira do Brasil" />
                <Input
                    value={telefone}
                    setValor={testTelefone}
                    className="input-field"
                    type="tel"
                    placeholder="TELEFONE(00)000000000..."
                />
            </div>
        </>
    );
}

PersonalDataForm.propTypes = {
    nome: PropTypes.string.isRequired,
    setNome: PropTypes.func.isRequired,
    sobrenome: PropTypes.string.isRequired,
    setSobrenome: PropTypes.func.isRequired,
    telefone: PropTypes.string.isRequired,
    setTelefone: PropTypes.func.isRequired,
    erroCampos: PropTypes.object.isRequired
};

export default PersonalDataForm;
