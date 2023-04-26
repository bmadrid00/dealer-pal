import { useEffect, useState } from 'react';



function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const soldYesNo = (automobile) => {
        if (automobile.sold) {
            return "Yes"
        } else {
            return "No"
        }
    }


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobiles.sort((a, b) => a.year - b.year).map(automobile => {
                    return (<tr key={automobile.id}>
                        <td>{automobile.vin}</td>
                        <td>{automobile.color.charAt(0).toUpperCase() + automobile.color.slice(1)}</td>
                        <td>{automobile.year}</td>
                        <td>{automobile.model.name}</td>
                        <td>{automobile.model.manufacturer.name}</td>
                        <td>{soldYesNo(automobile)}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default AutomobileList;
