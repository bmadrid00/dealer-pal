import { useEffect, useState } from 'react';




function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filterValue, setFilterValue] = useState('')

    //getData function calls api to get list of appointments

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

    //filteredAppointments is what is used to loop over the data later as this function will allow it to be updated constantly
    //if a user is typing into the filter results box by vin

    const filteredAppointments = () => {
        return appointments.filter((app) => {
            return (
                app.vin.toLowerCase().includes(filterValue.toLowerCase())
            );
        });
    };

    //function to set filterValue state as someone is typing into the vin filtering input

    const handleFilterValueChange = (b) => {
        const { value } = b.target
        setFilterValue(value)
    };


    return (
        <div>
            <div className='filter-input'>
                <input className='form-control' onChange={handleFilterValueChange} placeholder='VIN' id="filterBox" value={filterValue} />
            </div>
            <table className="table table-striped">
                <thead>
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
                    {/* sorts filtered appointments by date and then maps them returning the jsx seen below for each appointment */}

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
        </div>
    )
}

export default ServiceHistory;
