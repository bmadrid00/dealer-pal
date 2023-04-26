import { useEffect, useState } from 'react';



function ModelList() {
    const [carmodellist, setCarModelList] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();
            const carmodellist = data.models;
            setCarModelList(carmodellist)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <h1 className="text-left mb-4">Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {carmodellist.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    }).map(model => {
                        return (<tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td><img alt={model.name} src={model.picture_url} ></img></td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ModelList;
