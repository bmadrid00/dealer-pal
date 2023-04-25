import React, { useState } from 'react';

function TechnicianForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                first_name: '',
                last_name: '',
                employee_id: ''
            });
        }
    }

    const handleChangeName = (e) => {
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
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <h1 className="card-title">Add a New Technician</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="First Name" type="text" id="first_name" value={formData.first_name} name="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Last Name" type="text" id="last_name" value={formData.last_name} name="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Employee ID" type="text" id="employee_id" value={formData.employee_id} name="employee_id" className="form-control" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Add</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default TechnicianForm;
