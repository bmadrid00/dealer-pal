import { useEffect, useState } from 'react';



function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    //getData function calls api to get list of appointments

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        };
    };

    useEffect(() => {
        getData();
    }, []);

    //Function to send PUT to api to set appointment status to cancelled

    const handleCancelButton = async (b) => {
        const id = b.target.id;
        await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, { method: "PUT" });
    };

    //Function to send PUT to api to set appointment status to finished

    const handleFinishButton = async (b) => {
        const id = b.target.id;
        await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, { method: "PUT" });
    };




    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {appointments.sort((a, b) => a.date_time - b.date_time).map(appointment => {
                    return (<tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.customer}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                        <td>{appointment.reason}</td>
                        <td><button className="btn btn-danger" onClick={handleCancelButton} id={appointment.id}>Cancel</button></td>
                        <td><button className="btn btn-success" onClick={handleFinishButton} id={appointment.id}>Finish</button></td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default AppointmentList;
