import React, { useState, useEffect } from 'react';

function ModelForm() {

    const [manufacturers, setManufacturers] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
    })


    const getData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/models/'
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
                name: '',
                picture_url: '',
                manufacturer_id: '',
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
                        <h1 className="card-title">Create a vehicle model</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Model Name" type="text" id="name" value={formData.name} name="name" className="form-control" />
                            <label htmlFor="name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Picture URL" type="text" id="picture_url" value={formData.picture_url} name="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeName} name="manufacturer_id" id="manufacturer_id" className="form-select" required>
                                <option value=''>Choose a Manufacturer...</option>
                                {
                                    manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default ModelForm;
