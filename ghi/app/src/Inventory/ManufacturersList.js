import { useEffect, useState } from 'react';


function ManufacturersList() {
    const [manufacturers, setManufacturers] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');

        if (response.ok) {
            const data = await response.json();
            const manufacturers = data.manufacturers;
            setManufacturers(manufacturers)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <>
        <h1 className="text-left mb-4">Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.sort((a, b) => a.id - b.id).map(manufacturer => {
                    return (<tr key={manufacturer.id}>
                        <td>{manufacturer.name}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    )

}
export default ManufacturersList;
