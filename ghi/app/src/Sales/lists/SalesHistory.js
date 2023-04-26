import { useEffect, useState } from 'react';



function SalesHistoryList() {
    const [salesHistory, setSalesHistory] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [filterValue, setFilterValue] = useState([]);


    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        const responseSalespeople = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const data = await response.json();
            const dataSalespeople = await responseSalespeople.json();
            setSalesHistory(data.sales);
            setSalespersons(dataSalespeople.salespeople);
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const sortSalesHistory = () => {
        if (filterValue == '') {
            return salesHistory
        } else {
            return salesHistory.filter((sale) => {
                return (sale.salesperson.id == filterValue
                );
            });
        };
    };


    const handleFilterValueChange = (b) => {
        const { value } = b.target
        setFilterValue(value)
        return salesHistory.filter((sale) => {
            return (sale.salesperson.id == filterValue)
                ;
        })
    };



    return (
        <div>
            <div className='filter-input'>
                <select onChange={handleFilterValueChange} className='form-control'>
                    <option value="">Choose a Salesperson...</option>
                    {
                        salespersons.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>SalesPerson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sortSalesHistory().sort((a, b) => a.employee_id - b.employee_id).map(sale => {
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
        </div >
    )
}

export default SalesHistoryList;
