import React, { useState } from 'react';

function ManufacturerForm() {
    const [formData, setFormData] = useState({
        name: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8100/api/manufacturers/';

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
                name: ''
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
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <h1 className="card-title">Create a manufacturer</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleChange} required placeholder="Manufacturer" type="text" id="name" value={formData.name} name="name" className="form-control" />
                            <label htmlFor="name">Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default ManufacturerForm;
