import { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);
    // retieves sales data from api
    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    // delete a sale by id
    const handleDeleteButton = async (b) => {
        const id = b.target.id
        const resp = await fetch(`http://localhost:8090/api/sales/${id}`, { method: "delete" })

        if (resp.ok) {
            setSales(sales.filter(l => (l.id !== parseInt(id))))
        }
    }

    return (
        <>
            <h1 className="text-left mb-4">Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.sort((a, b) => a.id - b.id).map(sale => {
                        return (<tr key={sale.id}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.salesperson.first_name}</td>
                            <td>{sale.customer.first_name}</td>
                            <td>{sale.price}</td>
                            <td><button className="btn btn-danger" onClick={handleDeleteButton} id={sale.id} >Delete</button></td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}
export default SalesList;
