import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './Sales/forms/SalesPersonForm';
import CustomerForm from './Sales/forms/CustomerForm';
import SalesForm from './Sales/forms/SaleForm';
import CustomerList from './Sales/lists/CustomerList';
import SalesList from './Sales/lists/SalesList';
import SalesPersonsList from './Sales/lists/SalesPeople';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
