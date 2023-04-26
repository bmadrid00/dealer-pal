import { useEffect, useState } from 'react';




function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filterValue, setFilterValue] = useState('')

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const filteredAppointments = () => {
        return appointments.filter((app) => {
            return (
                app.vin.toLowerCase().includes(filterValue.toLowerCase())
            );
        });
    };


    const handleFilterValueChange = (b) => {
        const { value } = b.target
        setFilterValue(value)
        return appointments.filter((appointment) => appointment.vin.toLowerCase().includes(filterValue.toLowerCase()))
    };


    return (

        <table className="table table-striped">
            <thead>
                <div className='formcontrol'>
                    <input className='form-control' onChange={handleFilterValueChange} placeholder='VIN' id="filterBox" value={filterValue} />
                </div>
                <tr>
                    <th>VIN</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredAppointments().sort((a, b) => a.date - b.date).map(appointment => {
                    return (<tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.customer}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.status}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table >
    )
}

export default ServiceHistory;
