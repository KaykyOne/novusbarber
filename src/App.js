import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importando o Router corretamente
import Home from './pages/Home';
import Error from './pages/Error';
import SelectProfessional from './pages/customer/SelectProfessional';
import SelectDateAndHour from './pages/customer/SelectDateAndHour';
import SelectService from './pages/customer/SelectService';
import Confirm from './pages/customer/Confirm';
import Conclusion from './pages/customer/Conclusion';
import Cancel from './pages/customer/Cancel';
import LoginAdm from './pages/adm/LoginAdm';

function App() {
  return (
    <div>
      <title>NovusBarber</title>
      <Router basename="/novusbarber"> {/* Aqui está a modificação */}
        <Routes>
          <Route path="/:id" element={<Home />} />
          <Route path="/error" element={<Error />} />
          <Route path="/selectprofessional" element={<SelectProfessional />} />
          <Route path="/selectdateandhour" element={<SelectDateAndHour />} />
          <Route path="/selectservice" element={<SelectService />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/conclusion" element={<Conclusion />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/loginadm" element={<LoginAdm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
