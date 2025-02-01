import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import SelectProfessional from './pages/customer/SelectProfessional';
import SelectDateAndHour from './pages/customer/SelectDateAndHour';
import SelectService from './pages/customer/SelectService';
import Confirm from './pages/customer/Confirm';
import Conclusion from './pages/customer/Conclusion';
import Cancel from './pages/customer/Cancel';
import LoginAdm from './pages/adm/LoginAdm';
import HomeAdm from './pages/adm/HomeAdm';
import CreateCorteAdm from './pages/adm/CreateCorteAdm';

function App() {
  return (
    <div>
      <title>NovusBarber</title>
      <Router> {/* Usando HashRouter em vez de BrowserRouter */}
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
          <Route path="/homeadm" element={<HomeAdm />} />
          <Route path="/createcorteadm" element={<CreateCorteAdm />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
