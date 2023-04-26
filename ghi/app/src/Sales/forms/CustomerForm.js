import React, { useState } from 'react';

function CustomerForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8090/api/customers/';

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
                first_name: '',
                last_name: '',
                address: '',
                phone_number: ''
            });
        }
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
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <h1 className="card-title">Add a customer</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="First Name" type="text" id="first_name" value={formData.first_name} name="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="Last Name" type="text" id="last_name" value={formData.last_name} name="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="Address" type="text" id="address" value={formData.address} name="address" className="form-control" />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="Phone Number" type="number" id="phone_number" value={formData.phone_number} name="phone_number" className="form-control" />
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Add Customer</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default CustomerForm;
