import { useEffect, useState } from 'react';



function ShoesList() {
    const [shoes, setShoes] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/shoes/');

        if (response.ok) {
            const data = await response.json();
            setShoes(data.shoes)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleDeleteButton = async (b) => {
        const id = b.target.id
        const resp = await fetch(`http://localhost:8080/api/shoes/${id}`, { method: "delete" })

        if (resp.ok) {
            setShoes(shoes.filter(l => (l.id !== parseInt(id))))
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Model Name</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                {shoes.sort((a, b) => a.manufacturer - b.manufacturer).map(shoe => {
                    return (<tr key={shoe.id}>
                        <td>{shoe.manufacturer}</td>
                        <td>{shoe.model_name}</td>
                        <td>{shoe.color}</td>
                        <td><button className="btn btn-danger" onClick={handleDeleteButton} id={shoe.id} >Delete</button></td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default ShoesList;
