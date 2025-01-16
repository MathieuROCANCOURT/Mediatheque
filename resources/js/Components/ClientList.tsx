import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Client {
    id: number;
    name: string;
}

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        axios.get<Client[]>('/api/clients').then(response => {
            setClients(response.data);
        });
    }, []);

    return (
        <ul>
            {clients.map(client => (
                <li key={client.id}>{client.name}</li>
            ))}
        </ul>
    );
};

export default ClientList;
