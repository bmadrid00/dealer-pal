import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './service/forms/TechnicianForm';
import TechnicianList from './service/lists/TechnicianList';
import AppointmentForm from './service/forms/AppointmentForm';
import ServiceHistory from './service/lists/ServiceHistory';
import AppointmentList from './service/lists/AppointmentList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="add" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
