import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './service/forms/TechnicianForm';
import TechnicianList from './service/lists/TechnicianList';
import AppointmentForm from './service/forms/AppointmentForm';
import ServiceHistory from './service/lists/ServiceHistory';
import AppointmentList from './service/lists/AppointmentList';
import AutomobileForm from './inventory/forms/AutomobileForm';
import AutomobileList from './inventory/lists/AutomobileList';
import ModelForm from './inventory/forms/ModelForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="models">
            <Route path="new" element={<ModelForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
