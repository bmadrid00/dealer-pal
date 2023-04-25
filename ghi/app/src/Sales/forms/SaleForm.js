import React, { useState, useEffect } from 'react';

function SalesForm() {
const [automobiles, setAutomobiles] = useState([]);
const [salespersons, setSalesPersons] = useState([]);
const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: '',
        customer: '',
        price: ''
    });

    const getSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalesPersons(data.salespeople);
        }
    };

    const getCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };

    const getAutomobiles = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    };

    useEffect(() => {
        getSalespeople();
        getCustomers();
        getAutomobiles();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                automobile: '',
                salesperson: '',
                customer: '',
                price: ''
            });
        }
    }


    const handleOptionChange = (e) => {
        const value = parseInt(e.target.value);            
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
     }

    const handleChange = (e) => {
        const value = e.target.value;            
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
     }


    return (

        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <h1 className="card-title">Record a new sale</h1>
                        <div className="form-floating mb-3">
                            <select onChange={handleChange} required placeholder="Automobile VIN" id="automobile" name="automobile" className="form-select">
                            <option value=" ">Choose a automobile VIN</option> 
                                {automobiles.map(automobile => (
                                    <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleChange} required placeholder="Salesperson" id="salesperson" name="salesperson" className="form-select">
                            <option value="">Choose a salesperson</option> 
                                {salespersons.map(salesperson => (
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleOptionChange} required placeholder="Customer" id="customer" name="customer" className="form-select">
                            <option value="">Choose a customer</option>
                                {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleOptionChange} required placeholder="Price" type="number" id="price" value={formData.price} name="price" className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create a Customer</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default SalesForm;