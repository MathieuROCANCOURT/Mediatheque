import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CD {
    id: number;
    title: string;
    author: string;
    category: string;
}

const CDList: React.FC = () => {
    const [cds, setCds] = useState<CD[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCDs = async () => {
            try {
                // Use the correct base URL
                const response = await axios.get<CD[]>('http://localhost:8000/api/cds');
                setCds(response.data);
            } catch (err) {
                setError('Error fetching CDs');
                console.error('Error fetching data:', err);
            }
        };

        fetchCDs();
    }, []);

    const filteredCds = cds.filter(cd =>
        cd.author.toLowerCase().includes(filter.toLowerCase()) ||
        cd.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}
            <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filter by author or category"
                className="border p-2 mb-4 rounded text-blue-500 focus:bg-gray-700"
            />
            {cds.length === 0 ? (
                <p>Loading CDs...</p>
            ) : (
                <ul className="space-y-2">
                    {filteredCds.map(cd => (
                        <li key={cd.id} className="p-2 border rounded">
                            <h3 className="font-bold">{cd.title}</h3>
                            <p>Author: {cd.author}</p>
                            <p>Category: {cd.category}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CDList;
