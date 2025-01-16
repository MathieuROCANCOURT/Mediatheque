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

    useEffect(() => {
        axios.get<CD[]>('/api/cds').then(response => {
            setCds(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cds').then(response => {
            setCds(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const filteredCds = cds.filter(cd => cd.author.includes(filter) || cd.category.includes(filter));

    return (
        <div>
            Test
            <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter by author or category" />
            <ul>
                {filteredCds.map(cd => (
                    <li key={cd.id}>{cd.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CDList;
