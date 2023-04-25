import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])
    const [formData, setFormData] = useState({
        vin: '',
        customer: '',
        date: '',
        time: '',
        technician: '',
        reason: ''
    })
    const getData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `http://localhost:8080/api/appointments/`
        console.log(formData)
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
                vin: '',
                customer: '',
                date: '',
                time: '',
                technician: '',
                reason: ''
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
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <h1 className="card-title">Create a New Service Appointment</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Vehicle VIN" type="text" id="vin" value={formData.vin} name="vin" className="form-control" />
                            <label htmlFor="vin">Vehicle VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Customer name" type="text" id="customer" value={formData.customer} name="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Date of appointment" type="date" id="date" value={formData.date} name="date" className="form-control" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Time of appointment" type="time" id="time" value={formData.time} name="time" className="form-control" />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChangeName} name="technician" id="technician" className="form-select" required>
                                <option value=''>Choose a Technician</option>
                                {
                                    technicians.map(technician => {
                                        return (
                                            <option key={technician.employee_id} value={technician.employee_id}>{technician.first_name} {technician.last_name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeName} required placeholder="Reason for appointment" type="text" id="reason" value={formData.reason} name="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form >
                </div >
            </div >
        </div >
    );
}

export default AppointmentForm;
