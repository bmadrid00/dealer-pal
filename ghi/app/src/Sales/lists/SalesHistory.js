import { useEffect, useState } from 'react';



function SalesHistoryList() {
    const [saleshistory, setSalesHistory] = useState([]);
    const [salespersons, setSalespersons] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSalesHistory(data.sales)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <table className="table table-striped">
            <select className='form-control'>
                <option value="">Choose a Salesperson...</option>
                {
                    saleshistory.map(sale => {
                        return (
                            <option key={sale.salesperson.id} value={sale.salesperson.id}>{sale.salesperson.first_name} {sale.salesperson.last_name}</option>
                        )
                    })
                }
            </select>
            <thead>
                <tr>
                    <th>SalesPerson</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {saleshistory.sort((a, b) => a.employee_id - b.employee_id).map(sale => {
                    return (<tr key={sale.id}>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>{sale.price}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default SalesHistoryList;
