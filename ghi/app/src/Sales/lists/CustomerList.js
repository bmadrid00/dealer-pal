import { useEffect, useState } from 'react';



function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDeleteButton = async (b) => {
        const id = b.target.id
        const resp = await fetch(`http://localhost:8090/api/customers/${id}`, { method: "delete" })

        if (resp.ok) {
            setCustomers(customers.filter(l => (l.id !== parseInt(id))))
        }
    }

    return (
        <>
        <h1 className="text-left mb-4">Customer</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone number</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {customers.sort((a, b) => a.id - b.id).map(customer => {
                    return (<tr key={customer.id}>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.phone_number}</td>
                        <td>{customer.address}</td>
                        <td><button className="btn btn-danger" onClick={handleDeleteButton} id={customer.id} >Delete</button></td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    )

}
export default CustomerList;

