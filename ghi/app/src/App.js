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
import SalesPersonForm from './Sales/forms/SalesPersonForm';
import CustomerForm from './Sales/forms/CustomerForm';
import SalesForm from './Sales/forms/SaleForm';
import CustomerList from './Sales/lists/CustomerList';
import SalesList from './Sales/lists/SalesList';
import SalesPersonsList from './Sales/lists/SalesPeople';
import SalesHistoryList from './Sales/lists/SalesHistory';
import ManufacturersList from './inventory/lists/ManufacturersList';
import ManufacturerForm from './inventory/forms/CreateManufacturer';
import ModelList from './inventory/lists/ModelsList';

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
            <Route index element={<ModelList />}></Route>
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="new" element={<SalesPersonForm />} />
            <Route index element={<SalesPersonsList />} />
          </Route>
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
            <Route index element={<CustomerList />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesForm />} />
            <Route path="history" element={<SalesHistoryList />} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
        </Routes>
      </div >
    </BrowserRouter >
  );
}

export default App;
