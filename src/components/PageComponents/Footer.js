import React from 'react';
import LogoNovusTech from '../../imgs/logoNovusTech.png';

function Footer() {
    return (
        <div className="footer">
            <h4>Feito por NovusTech</h4>
            <img className='logoNovus' src={LogoNovusTech} alt="Logo NovusTech" />
        </div>
    )
}

export default Footer