import { useEffect, useState } from 'react';



function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDeleteButton = async (b) => {
        const id = b.target.id
        const resp = await fetch(`http://localhost:8080/api/technicians/${id}`, { method: "delete" })

        if (resp.ok) {
            setTechnicians(technicians.filter(l => (l.employee_id !== parseInt(id))))
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {technicians.sort((a, b) => a.employee_id - b.employee_id).map(technician => {
                    return (<tr key={technician.employee_id}>
                        <td>{technician.employee_id}</td>
                        <td>{technician.first_name}</td>
                        <td>{technician.last_name}</td>
                        <td><button className="btn btn-danger" onClick={handleDeleteButton} id={technician.employee_id} >Delete</button></td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )

}
export default TechnicianList;
