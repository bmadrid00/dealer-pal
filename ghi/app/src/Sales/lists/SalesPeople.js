import { useEffect, useState } from 'react';


function SalesPersonsList() {
    const [salespersons, setSalesPersons] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');

        if (response.ok) {
            const data = await response.json();
            const salespersons = data.salespeople;
            console.log("salespersons", salespersons)
            setSalesPersons(salespersons)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDeleteButton = async (b) => {
        const id = b.target.id
        const resp = await fetch(`http://localhost:8090/api/salespeople/${id}`, { method: "delete" })

        if (resp.ok) {
            setSalesPersons(salespersons.filter(l => (l.employee_id !== parseInt(id))))
        }
    }

    return (
        <>
            <h1 className="text-left mb-4">Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespersons.sort((a, b) => a.employee_id - b.employee_id).map(salesperson => {
                        return (<tr key={salesperson.id}>
                            <td>{salesperson.employee_id}</td>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                            <td><button className="btn btn-danger" onClick={handleDeleteButton} id={salesperson.employee_id} >Delete</button></td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )

}
export default SalesPersonsList;
