import React, { useState } from 'react';

function SalesPersonForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    // post request to API in JSON format
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/salespeople/';
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
                employee_id: '',
            });
        }
    }

    // update formData when input is changed
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
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <h1 className="card-title">Add a salesperson</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="First Name" type="text" id="first_name" value={formData.first_name} name="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="Last Name" type="text" id="last_name" value={formData.last_name} name="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="Employee ID" type="text" id="employee_id" value={formData.employee_id} name="employee_id" className="form-control" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Add Salesperson</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default SalesPersonForm;