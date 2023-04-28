import React, { useState, useEffect } from 'react';

function AutomobileForm() {

    const [models, setModels] = useState([])
    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: ''
    })


    const getData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async () => {

        const url = 'http://localhost:8100/api/automobiles/'
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
                color: '',
                year: '',
                vin: '',
                model_id: ''
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
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <h1 className="card-title">Add an automobile to inventory</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Color of Vehicle" type="text" id="color" value={formData.color} name="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Year of Vehicle" type="year" id="year" value={formData.year} name="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Vehicle VIN" type="text" id="vin" value={formData.vin} name="vin" className="form-control" />
                            <label htmlFor="vin">Vehicle VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeName} name="model_id" id="model_id" className="form-select" required>
                                <option value=''>Choose a Model...</option>
                                {
                                    models.map(model => {
                                        return (
                                            <option key={model.id} value={model.id}>{model.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button className="btn btn-primary">Add Automobile</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default AutomobileForm;
