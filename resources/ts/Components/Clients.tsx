import React from 'react';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/clients').then(response => {
            setClients(response.data);
        });
    }, []);

    return (
        <ul>
            {clients.map(client => (
                <li key={client.id}>{client.name} - {client.email}</li>
            ))}
        </ul>
    );
};

export default ClientList;
